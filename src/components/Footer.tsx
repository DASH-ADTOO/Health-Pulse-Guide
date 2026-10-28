import React from 'react';
import { Heart, ShieldCheck, PhoneCall } from 'lucide-react';
import { NavTabType } from './Navbar';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenEmergency: () => void;
  onOpenGlossary: () => void;
  onOpenHelplines: () => void;
  onNavigateTab: (tab: NavTabType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEmergency,
  onOpenGlossary,
  onOpenHelplines,
  onNavigateTab,
}) => {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-slate-200 bg-white mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Heart className="w-4 h-4 fill-white/20 text-white" />
              </div>
              <span className="text-base font-bold text-slate-900 font-heading">
                {language === 'hi' ? 'हेल्थपल्स गाइड' : 'HealthPulse Guide'}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'माता-पिता, देखभालकर्ताओं और युवाओं के लिए मौसमी स्वास्थ्य, एलर्जी और श्वसन संबंधी समस्याओं से निपटने के लिए साक्ष्य-आधारित बाल स्वास्थ्य मंच।'
                : 'An evidence-based seasonal wellness and pediatric health platform designed for parents, caregivers, and youth to navigate allergies, respiratory resilience, and proactive care.'}
            </p>
            <div className="flex items-center gap-1.5 text-teal-800 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>
                {language === 'hi'
                  ? 'चिकित्सकीय रूप से परीक्षित बाल परामर्श'
                  : 'Medically vetted clinical pediatric guidance'}
              </span>
            </div>
          </div>

          {/* Quick Links 1: Tracking & Screening Tools */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="font-bold text-slate-900 uppercase tracking-wider block">
              {language === 'hi' ? 'नैदानिक उपकरण एवं स्क्रीनर' : 'Clinical Tools & Screeners'}
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigateTab('symptoms')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  {language === 'hi'
                    ? 'बाल लक्षण ट्रैकर एवं डॉक्टर रिपोर्ट'
                    : 'Pediatric Symptom Tracker & Doctor Report'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('sleep')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  {language === 'hi'
                    ? 'युवा नींद की गुणवत्ता एवं स्वच्छता ट्रैकर'
                    : 'Youth Sleep Quality & Hygiene Tracker'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('companion')}
                  className="hover:text-teal-700 transition-colors font-medium text-teal-700 cursor-pointer"
                >
                  {language === 'hi'
                    ? 'हेल्थपल्स एआई साथी परामर्श (डॉ. जॉय)'
                    : 'HealthPulse Companion AI Analysis (Dr. Joy)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('bmi')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  {language === 'hi'
                    ? 'बीएमआई एवं विकास प्रतिशतक स्क्रीनर'
                    : 'BMI & Growth Percentile Screener'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('prevention')}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  {language === 'hi'
                    ? 'सक्रिय दैनिक निवारक स्वास्थ्य उपाय'
                    : 'Proactive Daily Prevention Tips'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGlossary}
                  className="hover:text-teal-700 transition-colors cursor-pointer"
                >
                  {language === 'hi'
                    ? 'सरल चिकित्सा शब्दावली'
                    : 'Plain-English Medical Glossary'}
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Emergency & Indian Helplines */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="font-bold text-slate-900 uppercase tracking-wider block">
              {language === 'hi' ? 'आपातकालीन एवं भारतीय हेल्पलाइन' : 'Emergency & Indian Helplines'}
            </span>
            <p className="text-slate-600 leading-relaxed">
              {language === 'hi'
                ? 'यदि किसी बच्चे को सांस लेने में अत्यधिक कठिनाई, नीलापन (नाखून/होंठ), अत्यधिक सुस्ती या तीव्र एलर्जी हो तो तुरंत आपातकालीन सेवा पर कॉल करें।'
                : 'If an infant or child displays extreme difficulty breathing, cyanosis (blue lips/nails), lethargy, or anaphylaxis, call emergency services immediately.'}
            </p>
            <div className="space-y-1 pt-1">
              <button
                onClick={onOpenHelplines}
                className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 underline block cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>
                  {language === 'hi'
                    ? 'भारतीय आपातकालीन हेल्पलाइन (112, 108, 104, 14416)'
                    : 'India Emergency Helplines (112, 108, 104, 14416)'}
                </span>
              </button>
              <button
                onClick={onOpenEmergency}
                className="inline-block text-rose-700 hover:text-rose-800 underline font-semibold cursor-pointer"
              >
                {language === 'hi'
                  ? 'खतरे के संकेत एवं तात्कालिकता मार्गदर्शिका देखें'
                  : 'View Danger Warning Signs & Triage'}
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Quiet Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <div>
            {language === 'hi'
              ? `© ${new Date().getFullYear()} हेल्थपल्स गाइड। केवल शैक्षणिक जानकारी; चिकित्सीय निदान का विकल्प नहीं।`
              : `© ${new Date().getFullYear()} HealthPulse Guide. Educational information only; not a substitute for clinical medical evaluation.`}
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>{language === 'hi' ? 'बाल स्वास्थ्य' : 'Pediatric Wellness'}</span>
            <span>·</span>
            <span>{language === 'hi' ? 'एलर्जी मार्गदर्शन' : 'Allergy Guidance'}</span>
            <span>·</span>
            <span>{language === 'hi' ? 'भारतीय स्वास्थ्य निर्देशिका' : 'India Health Directory'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
