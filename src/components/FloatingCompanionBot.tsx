import React, { useState, useRef, useEffect } from 'react';
import { AgeGroupId, SeasonId, DietaryPreference, ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import cuteDoctorAvatar from '../assets/images/cute_doctor_avatar.jpg';
import {
  Send,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Sparkles,
  PhoneCall,
  AlertTriangle,
  Loader2,
  Languages,
  MessageCircle,
} from 'lucide-react';

interface FloatingCompanionBotProps {
  currentAge: AgeGroupId;
  currentSeason: SeasonId;
  dietaryPreference: DietaryPreference;
  onOpenEmergency?: () => void;
  onOpenHelplines?: () => void;
  isOpenControlled?: boolean;
  onCloseControlled?: () => void;
}

const STORAGE_KEY_FLOATING_CHAT = 'healthpulse_floating_chat_v2';

const SUGGESTED_QUESTIONS_EN = [
  'Why does dry cough get worse at night during allergy season?',
  'How do I tell viral fever from seasonal allergies?',
  'What sleep schedule helps a teen recover from study fatigue?',
  'Calcium-rich vegetarian food for children with sensitive skin?',
  'When does a child fever need immediate emergency doctor care?',
];

const SUGGESTED_QUESTIONS_HI = [
  'रात में सूखी खांसी और कफ क्यों बढ़ जाता है?',
  'वायरल बुखार और मौसमी एलर्जी में क्या अंतर है?',
  'बच्चों और युवाओं के लिए स्वस्थ नींद की क्या आदतें हैं?',
  'संवेदनशील त्वचा वाले बच्चों के लिए शाकाहारी कैल्शियम आहार?',
  'बच्चों में तेज बुखार होने पर कब तुरंत अस्पताल जाएं?',
];

export const FloatingCompanionBot: React.FC<FloatingCompanionBotProps> = ({
  currentAge,
  currentSeason,
  dietaryPreference,
  onOpenEmergency,
  onOpenHelplines,
  isOpenControlled,
  onCloseControlled,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpenInternal, setIsOpenInternal] = useState<boolean>(false);
  const isExpanded = isOpenControlled !== undefined ? isOpenControlled : isOpenInternal;

  const setIsExpanded = (open: boolean) => {
    if (onCloseControlled && !open) {
      onCloseControlled();
    }
    setIsOpenInternal(open);
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FLOATING_CHAT);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasUnreadGreeting, setHasUnreadGreeting] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or update first welcome message if empty
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init',
        role: 'model',
        timestamp: new Date().toISOString(),
        content: t.botInitialMessage,
      };
      setMessages([initialGreeting]);
    }
  }, [language, t.botInitialMessage]);

  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY_FLOATING_CHAT, JSON.stringify(messages));
      }
    } catch {
      // ignore
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
      setHasUnreadGreeting(false);
    }
  }, [messages, isExpanded, isLoading]);

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
        content: data.reply || (language === 'hi' ? 'धन्यवाद। मैंने आपके प्रश्न का चिकित्सकीय विश्लेषण किया है।' : 'Thank you. I have analyzed your question.'),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      console.warn('Floating companion chat request fallback:', err);
      const fallbackText =
        language === 'hi'
          ? `🩺 **डॉ. जॉय स्वास्थ्य परामर्श (${currentAge} वर्ष, ${currentSeason})**:
1. **हाइड्रेशन व देखभाल**: पर्याप्त पानी, ओआरएस या नारियल पानी दें।
2. **लक्षणों की निगरानी**: यदि बुखार 48 घंटे से अधिक हो या सांस लेने में तकलीफ हो, तो तुरंत डॉक्टर को दिखाएं।
3. **हेल्पलाइन**: निःशुल्क सरकारी स्वास्थ्य सलाह के लिए **104** और आपातकाल में **112 / 108** पर कॉल करें।`
          : `🩺 **Dr. Joy Clinical Guidance (${currentAge} yrs, ${currentSeason})**:
1. **Hydration & Airway Care**: Maintain hydration with electrolytes or warm broths.
2. **Pediatric Monitoring**: Watch for persistent fever over 48 hours or breathing retractions.
3. **Emergency Support**: In India, call **104** (Health Advice) or **112 / 108** for emergency medical assistance.`;

      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: fallbackText,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const confirmText = language === 'hi' ? 'क्या आप बातचीत साफ़ करना चाहते हैं?' : 'Reset conversation history with Dr. Joy?';
    if (confirm(confirmText)) {
      const resetMsg: ChatMessage = {
        id: 'msg-reset',
        role: 'model',
        timestamp: new Date().toISOString(),
        content: t.botInitialMessage,
      };
      setMessages([resetMsg]);
    }
  };

  const suggestedQuestions = language === 'hi' ? SUGGESTED_QUESTIONS_HI : SUGGESTED_QUESTIONS_EN;

  return (
    <aside aria-label="HealthPulse Companion Chat" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* 1. Collapsed State: Cute Doctor Floating Bubble */}
      {!isExpanded && (
        <div className="flex items-center gap-3">
          {/* Friendly Speech Bubble / Tooltip */}
          {hasUnreadGreeting && (
            <div
              onClick={() => setIsExpanded(true)}
              className="hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-teal-100 text-xs font-semibold text-slate-800 cursor-pointer hover:border-teal-300 transition-all transform hover:-translate-y-0.5 group animate-bounce duration-1000"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="group-hover:text-teal-700">{t.botGreetingBubble}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-bold">
                {language === 'hi' ? 'ऑनलाइन' : 'Online'}
              </span>
            </div>
          )}

          {/* Cute Doctor Interactive Button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="relative group p-1 rounded-full focus:outline-hidden transition-transform active:scale-95"
            aria-label="Open Dr. Joy Health Companion"
          >
            {/* Pulsing Aura Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 opacity-75 blur-xs group-hover:opacity-100 animate-pulse transition-opacity"></div>

            {/* Avatar Circle Container */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-white shadow-xl bg-white overflow-hidden p-0.5 flex items-center justify-center transition-transform group-hover:scale-105">
              <img
                src={cuteDoctorAvatar}
                alt="Cute Doctor Dr. Joy"
                className="w-full h-full object-cover rounded-full"
              />
              {/* Online Green Indicator Dot */}
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center shadow-xs">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </div>

            {/* Cute mini badge */}
            <div className="absolute -top-1 -right-1 bg-teal-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-xs">
              🩺
            </div>
          </button>
        </div>
      )}

      {/* 2. Expanded State: Small Floating Chat Box */}
      {isExpanded && (
        <div className="w-[350px] sm:w-[390px] h-[540px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-teal-200/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header with Cute Doctor Info & Quick Actions */}
          <div className="px-4 py-3 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white flex items-center justify-between shadow-xs">
            {/* Left: Cute Doctor Avatar + Status */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-full border-2 border-teal-200/80 bg-white p-0.5 overflow-hidden shrink-0 shadow-xs">
                <img
                  src={cuteDoctorAvatar}
                  alt="Dr. Joy"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border border-white rounded-full"></span>
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight font-heading">
                    {t.botTitle}
                  </h3>
                  <span className="text-[10px] bg-teal-600/60 border border-teal-400/40 text-teal-100 px-1.5 py-0.2 rounded font-semibold">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/90 flex items-center gap-1 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{t.botOnline}</span>
                </p>
              </div>
            </div>

            {/* Right: Quick Language Toggle + Actions */}
            <div className="flex items-center gap-1">
              {/* Language Switcher inside bot */}
              <button
                onClick={toggleLanguage}
                title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
                className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-600/40 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
              >
                <Languages className="w-3.5 h-3.5" />
                <span className="text-[11px] uppercase">{language === 'en' ? 'हिंदी' : 'EN'}</span>
              </button>

              {/* Reset History */}
              <button
                onClick={handleClearHistory}
                title={t.botClearChat}
                className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-600/40 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Minimize */}
              <button
                onClick={() => setIsExpanded(false)}
                title={t.botMinimize}
                className="p-1.5 text-teal-200 hover:text-white hover:bg-teal-600/40 rounded-lg transition-colors ml-0.5"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Ribbon (Age & Season) */}
          <div className="px-3.5 py-1.5 bg-teal-50/80 border-b border-teal-100 flex items-center justify-between text-[11px] text-teal-900 font-medium">
            <span className="flex items-center gap-1">
              <span>🎯</span>
              <span>{currentAge} yrs • {currentSeason}</span>
            </span>
            <span className="text-[10px] text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
              {dietaryPreference === 'vegetarian' ? 'Veg' : dietaryPreference === 'non-vegetarian' ? 'Non-Veg' : 'All Diets'}
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Doctor Thumbnail */}
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full border border-teal-200 overflow-hidden shrink-0 mt-0.5 shadow-2xs bg-white">
                      <img
                        src={cuteDoctorAvatar}
                        alt="Dr. Joy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed ${
                      isUser
                        ? 'bg-teal-600 text-white rounded-tr-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <div className="space-y-1.5 whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        isUser ? 'text-teal-100' : 'text-slate-400'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 py-1">
                <div className="w-7 h-7 rounded-full border border-teal-200 overflow-hidden shrink-0 shadow-2xs bg-white">
                  <img
                    src={cuteDoctorAvatar}
                    alt="Dr. Joy"
                    className="w-full h-full object-cover animate-pulse"
                  />
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-tl-xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-teal-600 rounded-full animate-bounce"></span>
                  <span className="text-[11px] font-medium text-slate-500 ml-1">
                    {language === 'hi' ? 'डॉ. जॉय विश्लेषण कर रही हैं...' : 'Dr. Joy is analyzing...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-1.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight shrink-0">
              💡 {language === 'hi' ? 'सुझाव:' : 'Ask:'}
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="px-2 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 text-slate-700 text-[11px] rounded-full border border-slate-200 whitespace-nowrap transition-colors shrink-0 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar & Actions */}
          <div className="p-2.5 bg-white border-t border-slate-200 shrink-0 space-y-1.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.botInputPlaceholder}
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-teal-500 focus:bg-white transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
                title={t.botSend}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Helplines & Emergency Quick Links & Disclaimer */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-0.5">
              <span className="truncate max-w-[200px]" title={t.botDisclaimer}>
                {language === 'hi' ? '🚨 आपातकाल: 112 / 108' : '🚨 Emergency: 112 / 108'}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {onOpenHelplines && (
                  <button
                    type="button"
                    onClick={onOpenHelplines}
                    className="text-emerald-700 hover:underline font-bold"
                  >
                    {language === 'hi' ? 'हेल्पलाइन' : 'Helplines'}
                  </button>
                )}
                <span>•</span>
                {onOpenEmergency && (
                  <button
                    type="button"
                    onClick={onOpenEmergency}
                    className="text-rose-600 hover:underline font-bold"
                  >
                    {language === 'hi' ? 'चेतावनी' : 'Warning'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
