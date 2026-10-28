import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK if API Key is available
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback rule-based clinical response generator for offline/unconfigured environments
function generateFallbackClinicalAnalysis(
  userQuery: string,
  userContext?: { age?: string; season?: string; symptoms?: string; sleep?: string; diet?: string }
): string {
  const q = userQuery.toLowerCase();
  const age = userContext?.age || '5-14';
  const season = userContext?.season || 'current season';

  // Check for immediate emergency triggers
  if (
    q.includes('breath') ||
    q.includes('blue lips') ||
    q.includes('unconscious') ||
    q.includes('anaphylaxis') ||
    q.includes('stridor') ||
    q.includes('choking')
  ) {
    return `🚨 **URGENT MEDICAL ADVISORY**: The symptoms described may indicate acute respiratory distress or severe allergic reaction.
- **Immediate Action**: Call Indian Emergency Ambulance **108** or Universal Helpline **112** (or local emergency 911) immediately.
- Keep the person sitting upright; do NOT lay flat if struggling for breath.
- If prescribed an epinephrine autoinjector (EpiPen) or fast-acting rescue bronchodilator (albuterol/salbutamol inhaler with spacer), administer immediately as directed by their physician.
- Do not offer food or oral fluids while breathing is compromised.`;
  }

  if (q.includes('fever') || q.includes('temperature')) {
    return `🌡️ **Clinical Analysis on Fever & Temperature Management (${age} years)**:
1. **Hydration First**: In pediatric and youth fever, insensible fluid losses increase significantly. Offer frequent sips of Oral Rehydration Salts (ORS), coconut water, or clear broth.
2. **Monitoring Thresholds**:
   - For infants under 3 months: Any rectal temperature $\\ge$ 100.4°F (38.0°C) warrants immediate emergency pediatric evaluation.
   - For children & teens (5–18 yrs): Fevers above 102.5°F persisting for more than 48–72 hours, or fevers accompanied by lethargy, neck stiffness, or rash require in-person clinic review.
3. **Comfort Measures**: Dress in lightweight, breathable cotton clothing. Never use ice baths or alcohol rubs, as they cause shivering which elevates core body temperature.
4. **Helpline Support**: In India, call **104** (National Health Advice) or **1075** (National Health Mission) for 24/7 tele-consultation.`;
  }

  if (q.includes('cough') || q.includes('wheez') || q.includes('phlegm') || q.includes('cold')) {
    return `🌬️ **Respiratory & Cough Symptom Analysis (${season}, Age ${age})**:
1. **Differentiating Causes**:
   - **Dry, barking nocturnal cough**: Frequently triggered by seasonal airborne pollen, indoor dust mites, or viral croup.
   - **Wet, productive cough with chest rattle**: Often secondary to lower airway secretions or post-nasal drip from allergic rhinitis.
2. **Pediatric Evidence-Based Comfort**:
   - For children over 1 year: 1 teaspoon of pure honey before bedtime has clinical trials demonstrating superior cough relief compared to OTC dextromethorphan. (Never give honey under age 1 due to infant botulism risk).
   - Use cool-mist humidifiers or warm saline steam inhalation.
   - Use isotonic saline nasal drops or sprays before sleep to clear congested nasal passages.
3. **Red Flags**: If you notice rib retractions (skin sucking in between ribs when breathing), flared nostrils, or grunting, seek urgent medical care via **108 / 112**.`;
  }

  if (q.includes('sleep') || q.includes('insomnia') || q.includes('tired') || q.includes('wake')) {
    return `🌙 **Sleep Architecture & Hygiene Analysis for ${age} Years**:
1. **Clinical Target**: Based on pediatric sleep guidelines, individuals in the ${age} age group require consistent nightly restorative sleep.
2. **Circadian Anchors**:
   - Dim bright blue-spectrum device screens at least 60 minutes before bedtime; blue light suppresses endogenous melatonin secretion.
   - Keep bedroom ambient temperature cool (around 18–20°C / 65–68°F) with adequate ventilation.
   - Establish a 15-minute wind-down routine (warm shower, reading, light stretching).
3. **Symptom Interactions**: Undiagnosed nighttime allergic nasal congestion or mild exercise-induced asthma is one of the leading hidden causes of fragmented teen sleep.`;
  }

  return `🩺 **HealthPulse Clinical Guidance Analysis**:
Thank you for sharing your query. Here is an evidence-based clinical overview tailored to your profile (Age: ${age}, Climate: ${season}):

1. **Symptom Triaging**:
   - Track symptom onset, frequency, and whether they worsen indoors vs. outdoors.
   - Check if symptoms correlate with recent changes in diet, weather shifts, or environmental allergens (dust, damp walls, flowering trees).
2. **Actionable Home Protocols**:
   - Maintain optimal hydration with clean electrolytes and nutrient-dense, easily digestible meals.
   - For respiratory or skin sensitivity, minimize synthetic fragrances, chemical room fresheners, and unwashed bedding.
3. **When to Seek Evaluation**:
   - Symptoms that do not improve within 3 to 5 days, or any sudden escalation in severity, should be evaluated by a certified pediatrician or physician.
   - In India, you can call **104** (24/7 free medical consultation) or **112 / 108** for emergency medical assistance.

*Disclaimer: HealthPulse Companion provides educational information and is not a formal diagnostic tool. Always consult a licensed healthcare professional for clinical diagnoses.*`;
}

// API endpoint for Companion Bot
app.post('/api/companion/chat', async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const latestMessage = messages[messages.length - 1];
    const userPrompt = latestMessage.content || '';

    // If Gemini client is available, call gemini-3.8-flash
    if (aiClient) {
      try {
        const systemInstruction = `You are "HealthPulse Companion", an empathetic, evidence-based pediatric and family health guidance specialist.
Your goal is to help parents, youth, and caregivers deeply analyze their health questions, symptom logs, sleep hygiene, seasonal allergies, and wellness routines.

Current User Context:
- Target Age Group: ${userContext?.age || 'Youth & Family'}
- Current Season: ${userContext?.season || 'Current'}
- Dietary Preference: ${userContext?.diet || 'Not specified'}
- Active Tracked Symptoms: ${userContext?.symptoms || 'None logged recently'}
- Sleep Pattern Data: ${userContext?.sleep || 'Not recorded yet'}

Key Response Guidelines:
1. Tone: Reassuring, calm, clinically objective, and free from fear-mongering.
2. Structure: Use clear Markdown with concise headings, bullet points, and actionable next steps.
3. Pediatric Precision: Tailor all recommendations strictly to the user's stated age group (${userContext?.age || 'youth/parent'}).
4. Emergency Red Flags: If symptoms suggest acute distress (e.g. blue lips, severe breathing struggle, infant high fever with lethargy, anaphylaxis), prominently state emergency red flags and advise calling India Emergency Services (112 / 108) or 911 immediately.
5. Helplines: When relevant, reference official Indian resources like 104 (Health Advice), 14416 (Tele-MANAS for youth mental health), and 1800-11-6655 (AIIMS Poison Control).
6. Educational Boundary: Always conclude with a gentle reminder that this educational analysis supports, but never replaces, direct in-person evaluation by a qualified doctor.`;

        // Format conversation history for Gemini API
        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const generatePromise = aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API request timed out')), 4000)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        const replyText = response.text || generateFallbackClinicalAnalysis(userPrompt, userContext);
        return res.json({ reply: replyText });
      } catch (geminiError: any) {
        console.error('Gemini API call failed or timed out, using clinical fallback:', geminiError?.message || geminiError);
        const fallbackReply = generateFallbackClinicalAnalysis(userPrompt, userContext);
        return res.json({ reply: fallbackReply });
      }
    } else {
      // Fallback mode if no API key is configured
      const fallbackReply = generateFallbackClinicalAnalysis(userPrompt, userContext);
      return res.json({ reply: fallbackReply });
    }
  } catch (error: any) {
    console.error('Companion chat route error:', error);
    res.status(500).json({
      error: 'Unable to process health consultation at this time.',
      reply: generateFallbackClinicalAnalysis(req.body?.messages?.[0]?.content || '', req.body?.userContext),
    });
  }
});

// Mount Vite or static build depending on environment
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: 3000,
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HealthPulse Guide Full-Stack Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
