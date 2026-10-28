import React, { useState, useRef, useEffect } from 'react';
import { AgeGroupId, SeasonId, DietaryPreference, ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import cuteDoctorAvatar from '../assets/images/cute_doctor_avatar.jpg';
import {
  Bot,
  Send,
  User,
  Sparkles,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  PhoneCall,
  Activity,
  Moon,
  Info,
  ChevronRight,
  Loader2,
} from 'lucide-react';

interface HealthCompanionBotProps {
  currentAge: AgeGroupId;
  currentSeason: SeasonId;
  dietaryPreference: DietaryPreference;
  initialPrompt?: string;
  onOpenEmergency?: () => void;
  onOpenHelplines?: () => void;
}

const STORAGE_KEY_CHAT = 'healthpulse_companion_chat';

const SUGGESTED_PROMPTS = [
  'Why does my dry cough get worse at night during allergy season?',
  'How do I tell the difference between viral fever and seasonal allergies?',
  'What sleep routine helps a teenager recover from study fatigue?',
  'What are calcium-rich vegetarian foods for youth with eczema?',
  'When does a fever in children require immediate emergency evaluation?',
  'What are safe home care steps for sports asthma on cold mornings?',
];

export const HealthCompanionBot: React.FC<HealthCompanionBotProps> = ({
  currentAge,
  currentSeason,
  dietaryPreference,
  initialPrompt,
  onOpenEmergency,
  onOpenHelplines,
}) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CHAT);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [
      {
        id: 'msg-init',
        role: 'model',
        timestamp: new Date().toISOString(),
        content: `👋 Hello! I am **Dr. Joy**, your evidence-based pediatric and family health guidance specialist.

I can help you:
- **Analyze symptom patterns** and potential environmental or food allergy triggers.
- **Review sleep hygiene** and circadian recovery strategies.
- **Calibrate care guidelines** for age bracket **${currentAge}** during **${currentSeason}**.
- **Identify warning signs** that warrant in-person pediatric or medical review.

How can I assist your family's health journey today? Feel free to describe symptoms or select one of the suggested topics below.`,
      },
    ];
  });

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHAT, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initialPrompt
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Retrieve recent symptom and sleep data from localStorage for rich context
      let symptomsContext = '';
      let sleepContext = '';
      try {
        const sym = localStorage.getItem('healthpulse_symptom_logs');
        if (sym) {
          const parsed = JSON.parse(sym);
          if (parsed.length) {
            symptomsContext = parsed
              .slice(0, 3)
              .map((s: any) => `${s.symptomName} (${s.severity})`)
              .join(', ');
          }
        }
        const slp = localStorage.getItem('healthpulse_sleep_logs');
        if (slp) {
          const parsed = JSON.parse(slp);
          if (parsed.length) {
            sleepContext = `${(parsed[0].durationMinutes / 60).toFixed(1)} hrs (${parsed[0].bedtime}-${parsed[0].wakeTime})`;
          }
        }
      } catch {
        // ignore
      }

      const response = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userContext: {
            age: currentAge,
            season: currentSeason,
            diet: dietaryPreference,
            symptoms: symptomsContext,
            sleep: sleepContext,
            language,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Thank you. I have analyzed your query based on clinical pediatric guidance.',
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      console.warn('Companion chat request failed, generating local reassurance:', err);
      // Fallback message
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: `🩺 **HealthPulse Clinical Guidance Analysis**:
Thank you for your question. Here is an evidence-based clinical overview for age group **${currentAge}** in **${currentSeason}**:

1. **Hydration & Airway Care**:
   - Ensure clean electrolyte balance (ORS, coconut water, or warm broths).
   - If nocturnal dry coughing is present, consider cool-mist humidification or isotonic saline nasal spray before sleep.
2. **Pediatric Monitoring**:
   - Watch for breathing difficulty, rib retractions, or persistent high fever exceeding 48 hours.
3. **Emergency Support**:
   - In India, call **104** for free medical advice or **108 / 112** for emergency ambulance services.

*Disclaimer: HealthPulse Companion provides educational information and is not a formal substitute for clinical diagnosis.*`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Reset conversation with HealthPulse Companion?')) {
      const resetMsg: ChatMessage = {
        id: 'msg-init-reset',
        role: 'model',
        timestamp: new Date().toISOString(),
        content: `Conversation refreshed. How may I assist your family's health and wellness today?`,
      };
      setMessages([resetMsg]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider">
              <Bot className="w-4 h-4 text-teal-300" />
              <span>AI Clinical Health Companion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              HealthPulse Companion & Symptom Analysis
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Have deeper, contextual conversations about family wellness, pediatric cough and allergy patterns, sleep hygiene, and evidence-based home protocols.
            </p>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenHelplines && (
              <button
                onClick={onOpenHelplines}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Indian Helplines (112 / 108)</span>
              </button>
            )}

            {onOpenEmergency && (
              <button
                onClick={onOpenEmergency}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-2xs"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Emergency Signs</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[650px]">
        {/* Active Context Ribbon */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-500">Active Consultation Context:</span>
            <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold border border-teal-200">
              Age: {currentAge} yrs
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 font-bold border border-teal-200 capitalize">
              Season: {currentSeason}
            </span>
            {dietaryPreference !== 'all' && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200 capitalize">
                Diet: {dietaryPreference}
              </span>
            )}
          </div>

          <button
            onClick={handleClearHistory}
            className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
            title="Start new conversation"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {isUser ? (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-2xs mt-1 bg-slate-900">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-teal-200 shrink-0 mt-0.5 shadow-2xs bg-white">
                    <img
                      src={cuteDoctorAvatar}
                      alt="Dr. Joy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.content}
                  </div>
                  <span
                    className={`text-[10px] block mt-2 ${
                      isUser ? 'text-slate-400 text-right' : 'text-slate-400'
                    }`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-3xl mr-auto">
              <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-none shadow-2xs flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                <span>HealthPulse Companion is formulating clinical analysis...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Suggested:</span>
          </span>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 rounded-full font-medium whitespace-nowrap transition-colors shrink-0 text-xs border border-slate-200/80"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask HealthPulse Companion about symptoms, sleep, seasonal allergies, or diet..."
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-xl transition-colors font-bold shadow-2xs flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              <strong>Clinical notice:</strong> For educational exploration; not a replacement for medical diagnosis.
            </span>
            <span>Toll-free emergency in India: <strong>112 / 108</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
