import React from 'react';
import { X, ShieldAlert, PhoneCall, AlertCircle, Wind, Thermometer, Sun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EmergencyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyGuideModal: React.FC<EmergencyGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-rose-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 bg-rose-600 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading leading-none">
                {t.emergencyTitle}
              </h2>
              <span className="text-xs text-rose-100">
                {t.emergencySubtitle}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Quick Hotlines Banner with Indian Helplines */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-sm">{t.emergencyBannerTitle}</span>
              </div>
              <span className="text-[11px] font-semibold text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-md border border-rose-800">
                {t.emergency247Badge}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <a
                href="tel:112"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 transition-colors block"
              >
                <div className="font-black text-emerald-400 text-sm">112</div>
                <div className="text-slate-300 text-[10px]">
                  {language === 'hi' ? 'राष्ट्रीय आपातकालीन (भारत)' : 'National Emergency (India)'}
                </div>
              </a>

              <a
                href="tel:108"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 transition-colors block"
              >
                <div className="font-black text-emerald-400 text-sm">108</div>
                <div className="text-slate-300 text-[10px]">
                  {language === 'hi' ? 'चिकित्सीय एम्बुलेंस (भारत)' : 'Medical Ambulance (India)'}
                </div>
              </a>

              <a
                href="tel:104"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 transition-colors block"
              >
                <div className="font-black text-emerald-400 text-sm">104</div>
                <div className="text-slate-300 text-[10px]">
                  {language === 'hi' ? 'स्वास्थ्य सलाह / डॉक्टर (भारत)' : 'Medical Advice / Doctor (India)'}
                </div>
              </a>

              <a
                href="tel:1800116655"
                className="p-2 rounded-lg bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700 transition-colors block"
              >
                <div className="font-black text-emerald-400 text-sm">1800-11-6655</div>
                <div className="text-slate-300 text-[10px]">
                  {language === 'hi' ? 'एम्स विष नियंत्रण (भारत)' : 'Poison AIIMS (India)'}
                </div>
              </a>
            </div>

            <div className="text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-1 pt-1 border-t border-slate-800">
              <span>
                {language === 'hi'
                  ? 'टेली-मानस मानसिक स्वास्थ्य (भारत): 14416 · वैश्विक आपातकाल: 911'
                  : 'USA/Global: Dial 911 · Tele-MANAS Youth Distress (India): 14416'}
              </span>
            </div>
          </div>

          {/* Section 1: Anaphylaxis (Severe Allergy) */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm font-heading">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>
                {language === 'hi'
                  ? '1. तीव्र गंभीर एलर्जी (एनाफिलेक्सिस - Anaphylaxis)'
                  : '1. Severe Allergy (Anaphylaxis)'}
              </span>
            </div>
            <p className="text-rose-950 leading-relaxed">
              {language === 'hi'
                ? 'एलर्जी कारक भोजन, कीड़े के काटने या दवा के बाद तेजी से विकसित होती है। इसमें शरीर के दो या अधिक अंग तंत्र शामिल होते हैं:'
                : 'Occurs rapidly after eating an allergen, insect sting, or medication. Involves two or more body systems:'}
            </p>
            <ul className="pl-4 list-disc space-y-1 text-rose-900 leading-relaxed">
              <li>
                <strong>{language === 'hi' ? 'वायुमार्ग:' : 'Airway:'}</strong>{' '}
                {language === 'hi'
                  ? 'जीभ, होंठ, गले में सूजन; भारी आवाज; गला घुटने जैसा लगना।'
                  : 'Swelling of tongue, lips, uvula; hoarse voice; tightness in throat.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'श्वसन:' : 'Breathing:'}</strong>{' '}
                {language === 'hi'
                  ? 'सांस फूलना, लगातार सूखी खांसी, सांस में सीटी की आवाज (wheezing)।'
                  : 'Shortness of breath, persistent cough, audible wheezing.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'रक्त संचार:' : 'Circulation:'}</strong>{' '}
                {language === 'hi'
                  ? 'चक्कर आना, अचानक त्वचा का पीला या नीला पड़ना, बेहोशी।'
                  : 'Dizziness, sudden pale or blue skin, collapse, fainting.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'पेट:' : 'Stomach:'}</strong>{' '}
                {language === 'hi'
                  ? 'चकत्तों के साथ बार-बार तेज उल्टी या पेट में तीव्र मरोड़।'
                  : 'Repeated severe vomiting or intense cramping alongside hives.'}
              </li>
            </ul>
            <div className="p-2.5 bg-white rounded-lg border border-rose-300 text-rose-950 font-semibold">
              {language === 'hi'
                ? 'उपाय: तुरंत एपिनेफ्रिन ऑटो-इंजेक्टर (EpiPen) जांघ के बाहरी हिस्से में लगाएं। 112/108 डायल करें। मरीज को खड़ा न करें, लिटाकर रखें।'
                : 'Action: Inject Epinephrine Auto-Injector into outer mid-thigh right away. Call 911 or 112/108. Never make the person stand up or walk.'}
            </div>
          </div>

          {/* Section 2: Severe Respiratory Distress (Asthma, Croup, RSV) */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm font-heading">
              <Wind className="w-4 h-4 text-blue-600" />
              <span>
                {language === 'hi'
                  ? '2. बाल श्वसन संकट (दमा या संक्रमण के गंभीर लक्षण)'
                  : '2. Pediatric Respiratory Distress'}
              </span>
            </div>
            <p className="text-blue-950 leading-relaxed">
              {language === 'hi'
                ? 'ऑक्सीजन की कमी से बच्चे बहुत जल्दी थक जाते हैं। यदि निम्न में से कोई लक्षण दिखे तो तुरंत आपातकालीन सहायता लें:'
                : 'Children tire out quickly when struggling for oxygen. Seek emergency care immediately if you notice:'}
            </p>
            <ul className="pl-4 list-disc space-y-1 text-blue-900 leading-relaxed">
              <li>
                <strong>{language === 'hi' ? 'पसलियों का धंसना (Retractions):' : 'Retractions:'}</strong>{' '}
                {language === 'hi'
                  ? 'सांस लेते समय पसलियों के बीच या गर्दन के नीचे गड्ढा पड़ना।'
                  : 'Skin pulling deeply into the ribs or at the notch of the neck.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'नथुने फूलना (Nasal Flaring):' : 'Nasal Flaring:'}</strong>{' '}
                {language === 'hi'
                  ? 'प्रत्येक सांस के साथ नाक के नथुने चौड़े होना।'
                  : 'Nostrils widening significantly with each breath.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'स्ट्रिडोर (Stridor):' : 'Stridor at rest:'}</strong>{' '}
                {language === 'hi'
                  ? 'आराम की स्थिति में सांस अंदर खींचते समय तीखी सीटी जैसी आवाज।'
                  : 'High-pitched musical squeak while breathing in quietly.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'रंग परिवर्तन (Cyanosis):' : 'Color change:'}</strong>{' '}
                {language === 'hi'
                  ? 'होंठों या नाखूनों के चारों ओर नीला या भूरापन।'
                  : 'Gray or bluish tint around the mouth or fingernails.'}
              </li>
            </ul>
          </div>

          {/* Section 3: High Fever & Infection */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-heading">
              <Thermometer className="w-4 h-4 text-amber-600" />
              <span>
                {language === 'hi' ? '3. तेज बुखार के चेतावनी संकेत' : '3. Fever Warning Thresholds'}
              </span>
            </div>
            <ul className="pl-4 list-disc space-y-1 text-amber-900 leading-relaxed">
              <li>
                <strong>{language === 'hi' ? '3 महीने से कम उम्र के शिशु:' : 'Infants under 3 months:'}</strong>{' '}
                {language === 'hi'
                  ? '100.4°F (38°C) या अधिक तापमान होने पर तुरंत आपातकालीन कक्ष (ER) ले जाएं।'
                  : 'Rectal temperature of 100.4°F (38°C) or higher requires immediate ER evaluation.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'किसी भी उम्र में:' : 'Any age:'}</strong>{' '}
                {language === 'hi'
                  ? 'दवा देने के बाद भी 104°F (40°C) से अधिक तापमान का न उतरना।'
                  : 'Fever exceeding 104°F (40°C) unresponsive to medication.'}
              </li>
              <li>
                <strong>{language === 'hi' ? 'गर्दन में अकड़न:' : 'Stiff neck:'}</strong>{' '}
                {language === 'hi'
                  ? 'ठोड़ी को छाती से छूने में असमर्थता, अत्यधिक सुस्ती या गहरे बैंगनी चकत्ते।'
                  : 'Inability to touch chin to chest, severe lethargy, or non-blanching purple rash (petechiae).'}
              </li>
            </ul>
          </div>

          {/* Section 4: Heatstroke vs Heat Exhaustion */}
          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 space-y-2">
            <div className="flex items-center gap-2 text-orange-900 font-bold text-sm font-heading">
              <Sun className="w-4 h-4 text-orange-600" />
              <span>
                {language === 'hi'
                  ? '4. लू और हीटस्ट्रोक (गर्मियों के खेल एवं व्यायाम)'
                  : '4. Exertional Heatstroke (Summer Sports)'}
              </span>
            </div>
            <p className="text-orange-950 leading-relaxed">
              {language === 'hi'
                ? 'यदि कोई युवा भ्रमित हो जाए, लड़खड़ाने लगे, उल्टी करे, त्वचा अत्यधिक गर्म हो और पसीना आना बंद हो जाए, तो तुरंत ठंडे पानी में स्नान कराएं या गर्दन, बगल और जांघों पर बर्फ रखें और तुरंत 108/112 पर कॉल करें।'
                : 'If an athlete becomes confused, stumbles, vomits, or has hot skin and stops sweating, core temperature may exceed 104°F. Immerse immediately in cold water or apply ice packs to neck, armpits, and groin while 911/108 is dispatched.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            {t.emergencyCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
