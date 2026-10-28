import React, { useState, useEffect, useMemo } from 'react';
import {
  SymptomLog,
  SymptomCategory,
  SymptomSeverity,
  AgeGroupId,
} from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Activity,
  Plus,
  Trash2,
  AlertTriangle,
  FileText,
  Calendar,
  Thermometer,
  Clock,
  ChevronDown,
  ChevronUp,
  Download,
  Stethoscope,
  Bot,
} from 'lucide-react';

interface SymptomTrackerProps {
  currentAge: AgeGroupId;
  onOpenCompanionWithContext?: (contextPrompt: string) => void;
  onOpenEmergency?: () => void;
}

const STORAGE_KEY_SYMPTOMS = 'healthpulse_symptom_logs';

export const SymptomTracker: React.FC<SymptomTrackerProps> = ({
  currentAge,
  onOpenCompanionWithContext,
  onOpenEmergency,
}) => {
  const { language } = useLanguage();

  const symptomCategories: { id: SymptomCategory; label: string; icon: string; typicalTriggers: string[] }[] = useMemo(() => {
    if (language === 'hi') {
      return [
        {
          id: 'fever',
          label: 'बुखार / कंपकंपी',
          icon: '🌡️',
          typicalTriggers: ['वायरल संक्रमण', 'मौसम में बदलाव', 'टीकाकरण के बाद', 'अत्यधिक थकान'],
        },
        {
          id: 'cough-cold',
          label: 'खांसी / गले में खराश',
          icon: '🗣️',
          typicalTriggers: ['ठंडी हवा', 'पोस्ट-नेजल ड्रिप', 'वायरल फ्लू', 'कमरे का सूखापन'],
        },
        {
          id: 'allergic-rhinitis',
          label: 'छींकें / बहती नाक',
          icon: '🤧',
          typicalTriggers: ['परागकण', 'धूल के कण', 'पालतू जानवर की रूसी', 'धुआं / प्रदूषण'],
        },
        {
          id: 'asthma-wheezing',
          label: 'छाती में जकड़न / सीटी बजना',
          icon: '🫁',
          typicalTriggers: ['दौड़ना / व्यायाम', 'ठंडी हवा', 'आर्द्रता / उमस', 'तेज गंध / स्प्रे'],
        },
        {
          id: 'eczema-rash',
          label: 'त्वचा में खुजली / एक्जिमा',
          icon: '🩹',
          typicalTriggers: ['सिंथेटिक कपड़े', 'गर्म पानी से नहाना', 'पसीना', 'खुशबूदार साबुन'],
        },
        {
          id: 'headache',
          label: 'सिरदर्द / साइनस दबाव',
          icon: '🤕',
          typicalTriggers: ['पानी की कमी', 'स्क्रीन का तनाव', 'साइनस रुकावट', 'नींद की कमी'],
        },
        {
          id: 'digestive',
          label: 'पेट दर्द / मतली',
          icon: '🤢',
          typicalTriggers: ['भारी डेयरी', 'बाहर का खाना', 'चिंता / तनाव', 'भोजन छोड़ना'],
        },
        {
          id: 'fatigue-bodyache',
          label: 'थकान / बदन दर्द',
          icon: '🥱',
          typicalTriggers: ['वायरल लक्षण', 'नींद का अभाव', 'निर्जलीकरण', 'अत्यधिक परिश्रम'],
        },
      ];
    }
    return [
      {
        id: 'fever',
        label: 'Fever / Chills',
        icon: '🌡️',
        typicalTriggers: ['Viral Infection', 'Seasonal Shift', 'Post-Vaccination', 'Exhaustion'],
      },
      {
        id: 'cough-cold',
        label: 'Cough / Sore Throat',
        icon: '🗣️',
        typicalTriggers: ['Cold Air', 'Post-Nasal Drip', 'Viral Flu', 'Dry Indoors'],
      },
      {
        id: 'allergic-rhinitis',
        label: 'Sneezing / Runny Nose',
        icon: '🤧',
        typicalTriggers: ['Pollen', 'Dust Mites', 'Pet Dander', 'Smoke / Smog'],
      },
      {
        id: 'asthma-wheezing',
        label: 'Chest Tightness / Wheezing',
        icon: '🫁',
        typicalTriggers: ['Exercise', 'Cold Weather', 'Humidity', 'Aerosol Spray'],
      },
      {
        id: 'eczema-rash',
        label: 'Skin Itch / Eczema Flare',
        icon: '🩹',
        typicalTriggers: ['Synthetic Fabric', 'Hot Water Bath', 'Sweat', 'Fragrant Soap'],
      },
      {
        id: 'headache',
        label: 'Headache / Sinus Pressure',
        icon: '🤕',
        typicalTriggers: ['Dehydration', 'Screen Strain', 'Sinus Block', 'Lack of Sleep'],
      },
      {
        id: 'digestive',
        label: 'Stomach Ache / Nausea',
        icon: '🤢',
        typicalTriggers: ['Heavy Dairy', 'Street Food', 'Anxiety / Stress', 'Skipped Meals'],
      },
      {
        id: 'fatigue-bodyache',
        label: 'Fatigue / Body Aches',
        icon: '🥱',
        typicalTriggers: ['Viral Prodrome', 'Sleep Deficit', 'Dehydration', 'Over-exertion'],
      },
    ];
  }, [language]);

  const commonTriggers = useMemo(() => {
    if (language === 'hi') {
      return [
        'परागकण',
        'धूल के कण',
        'ठंडी हवा',
        'उमस / बारिश',
        'स्क्रीन समय',
        'देर से सोना',
        'डेयरी उत्पाद',
        'तेज गंध / परफ्यूम',
        'भारी व्यायाम',
        'परीक्षा का तनाव',
      ];
    }
    return [
      'Pollen',
      'Dust Mites',
      'Cold Air',
      'Humidity / Rain',
      'Screen Time',
      'Late Bedtime',
      'Dairy Food',
      'Strong Fragrance',
      'Heavy Exercise',
      'Stress / Exams',
    ];
  }, [language]);

  const [logs, setLogs] = useState<SymptomLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SYMPTOMS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'sym-01',
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        category: 'allergic-rhinitis',
        symptomName: language === 'hi' ? 'लगातार छींकें और आंखों से पानी' : 'Continuous sneezing & watery eyes',
        severity: 'moderate',
        triggers: [language === 'hi' ? 'परागकण' : 'Pollen', language === 'hi' ? 'ठंडी हवा' : 'Cold Air'],
        notes: language === 'hi' ? 'पार्क में सुबह की सैर के बाद लक्षण बढ़े।' : 'Worse after morning walk in the park.',
        ageGroup: currentAge === 'all' ? '10-14' : currentAge,
      },
      {
        id: 'sym-02',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        category: 'cough-cold',
        symptomName: language === 'hi' ? 'रात में सूखी खांसी' : 'Dry nocturnal tickly cough',
        severity: 'mild',
        triggers: [language === 'hi' ? 'ठंडी हवा' : 'Cold Air'],
        notes: language === 'hi' ? 'गुनगुने पानी की भाप से थोड़ा आराम मिला।' : 'Improved slightly after warm saline steam.',
        ageGroup: currentAge === 'all' ? '10-14' : currentAge,
      },
    ];
  });

  // Form state
  const [category, setCategory] = useState<SymptomCategory>('fever');
  const [symptomName, setSymptomName] = useState<string>('');
  const [severity, setSeverity] = useState<SymptomSeverity>('mild');
  const [temperatureF, setTemperatureF] = useState<string>('99.2');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [showDoctorReport, setShowDoctorReport] = useState<boolean>(false);
  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SYMPTOMS, JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  const handleCategoryChange = (cat: SymptomCategory) => {
    setCategory(cat);
    const catObj = symptomCategories.find((c) => c.id === cat);
    if (catObj) {
      setSymptomName(catObj.label);
      if (catObj.typicalTriggers[0]) {
        setSelectedTriggers([catObj.typicalTriggers[0]]);
      }
    }
  };

  const toggleTrigger = (trig: string) => {
    setSelectedTriggers((prev) =>
      prev.includes(trig) ? prev.filter((t) => t !== trig) : [...prev, trig]
    );
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = symptomCategories.find((c) => c.id === category);
    const finalName = symptomName.trim() || catObj?.label || (language === 'hi' ? 'लक्षण प्रविष्टि' : 'Symptom Entry');

    const tempVal = parseFloat(temperatureF);
    let finalF: number | undefined = undefined;
    let finalC: number | undefined = undefined;

    if (category === 'fever' && !isNaN(tempVal)) {
      if (tempUnit === 'F') {
        finalF = tempVal;
        finalC = parseFloat((((tempVal - 32) * 5) / 9).toFixed(1));
      } else {
        finalC = tempVal;
        finalF = parseFloat(((tempVal * 9) / 5 + 32).toFixed(1));
      }
    }

    const newLog: SymptomLog = {
      id: `sym-${Date.now()}`,
      timestamp: new Date().toISOString(),
      category,
      symptomName: finalName,
      severity,
      temperatureF: finalF,
      temperatureC: finalC,
      triggers: selectedTriggers,
      notes: notes.trim() || undefined,
      ageGroup: currentAge === 'all' ? '10-14' : currentAge,
    };

    setLogs((prev) => [newLog, ...prev]);
    setNotes('');
    setSymptomName('');
    setIsFormExpanded(false);
  };

  const handleDeleteLog = (id: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  const handleClearAll = () => {
    const confirmMsg = language === 'hi' ? 'क्या आप सभी लक्षण इतिहास हटाना चाहते हैं?' : 'Clear all recorded symptom history?';
    if (confirm(confirmMsg)) {
      setLogs([]);
    }
  };

  // Severity metrics
  const stats = useMemo(() => {
    const total = logs.length;
    const severeCount = logs.filter((l) => l.severity === 'severe').length;
    const feverLogs = logs.filter((l) => l.category === 'fever' && l.temperatureF);
    const highestTemp = feverLogs.length
      ? Math.max(...feverLogs.map((l) => l.temperatureF!))
      : null;

    return { total, severeCount, highestTemp };
  }, [logs]);

  const hasUrgentConcern = useMemo(() => {
    if (!logs.length) return false;
    const latest = logs[0];
    if (latest.severity === 'severe') return true;
    if (latest.temperatureF && latest.temperatureF >= 102.5) return true;
    return false;
  }, [logs]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>{language === 'hi' ? 'साक्ष्य-आधारित क्लिनिकल जर्नल' : 'Evidence-Based Clinical Journal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">
              {language === 'hi' ? 'बाल एवं युवा लक्षण ट्रैकर' : 'Pediatric & Youth Symptom Tracker'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'दैनिक एलर्जी के लक्षण, बुखार का तापमान और खांसी को रिकॉर्ड करें। डॉक्टर की यात्रा के लिए व्यवस्थित सारांश तैयार करें।'
                : 'Log daily allergy symptoms, fever readings, and respiratory flare-ups. Generate organized clinical summaries for pediatrician visits.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {logs.length > 0 && (
              <button
                onClick={() => setShowDoctorReport(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white text-slate-900 hover:bg-teal-50 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-600" />
                <span>{language === 'hi' ? 'डॉक्टर रिपोर्ट सारांश' : 'Doctor Visit Summary'}</span>
              </button>
            )}

            {onOpenCompanionWithContext && (
              <button
                onClick={() => {
                  const summaryText = logs
                    .slice(0, 3)
                    .map(
                      (l) =>
                        `${l.symptomName} (${l.severity}${l.temperatureF ? `, ${l.temperatureF}°F` : ''}, triggers: ${l.triggers.join(', ')})`
                    )
                    .join('; ');
                  onOpenCompanionWithContext(
                    language === 'hi'
                      ? `कृपया मेरे दर्ज किए गए लक्षणों का विश्लेषण करें: ${summaryText || 'हल्की एलर्जी और खांसी के लक्षण'}। मुझे क्या सावधानियां बरतनी चाहिए?`
                      : `Please analyze my logged symptoms: ${summaryText || 'Recent mild allergy and cough symptoms'}. What are evidence-based next steps and warning signs to monitor?`
                  );
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                <Bot className="w-4 h-4 text-teal-200" />
                <span>{language === 'hi' ? 'डॉ. जॉय से विश्लेषण कराएं' : 'Analyze with Companion AI'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Urgent Warning Ribbon */}
      {hasUrgentConcern && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-rose-950 font-heading">
                {language === 'hi'
                  ? 'तीव्र लक्षण या अत्यधिक तापमान दर्ज हुआ'
                  : 'High Severity Symptom / Elevated Temperature Recorded'}
              </h4>
              <p className="text-xs text-rose-800 leading-relaxed">
                {language === 'hi'
                  ? 'यदि व्यक्ति में अत्यधिक सुस्ती, सांस लेने में जोर लगना, होंठों का नीलापन या गर्दन में अकड़न हो, तो देर न करें। भारतीय एम्बुलेंस 108 / 112 पर तुरंत कॉल करें।'
                  : 'If the person exhibits lethargy, struggle for breath, lip blueness, or stiff neck, do not delay care. Call Indian Ambulance 108 / 112 or visit the nearest emergency room.'}
              </p>
            </div>
          </div>
          {onOpenEmergency && (
            <button
              onClick={onOpenEmergency}
              className="px-3 py-1.5 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
            >
              {language === 'hi' ? 'खतरे के संकेत देखें' : 'View Danger Signs'}
            </button>
          )}
        </div>
      )}

      {/* Grid: Form on Left / History on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Log New Symptom */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {language === 'hi' ? 'नया लक्षण दर्ज करें' : 'Record New Symptom'}
              </h3>
            </div>
            <button
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <span>{isFormExpanded ? (language === 'hi' ? 'छोटा करें' : 'Collapse') : (language === 'hi' ? 'फॉर्म खोलें' : 'Expand Form')}</span>
              {isFormExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {isFormExpanded && (
            <form onSubmit={handleAddLog} className="space-y-4">
              {/* Category Selection Grid */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'लक्षण श्रेणी चुनें' : 'Select Symptom Category'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {symptomCategories.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 border-teal-600 text-teal-950 font-bold shadow-2xs'
                            : 'bg-slate-50 border-slate-200/90 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span className="text-xs leading-tight line-clamp-1">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Symptom Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'विशिष्ट विवरण' : 'Specific Description / Manifestation'}
                </label>
                <input
                  type="text"
                  value={symptomName}
                  onChange={(e) => setSymptomName(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'उदा. रात में सूखी खांसी, खेलने के बाद सीटी की आवाज, पलकों पर सूजन...'
                      : 'e.g. Dry night cough, wheezing after football, eyelid swelling...'
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                />
              </div>

              {/* Severity Segmented Control */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'गंभीरता का स्तर' : 'Severity Level'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSeverity('mild')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      severity === 'mild'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {language === 'hi' ? 'हल्का (Mild)' : 'Mild (Noticeable)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeverity('moderate')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      severity === 'moderate'
                        ? 'bg-amber-50 border-amber-500 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {language === 'hi' ? 'मध्यम (Moderate)' : 'Moderate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeverity('severe')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      severity === 'severe'
                        ? 'bg-rose-50 border-rose-500 text-rose-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {language === 'hi' ? 'गंभीर (Severe)' : 'Severe'}
                  </button>
                </div>
              </div>

              {/* Temperature Reading (Only if Fever selected) */}
              {category === 'fever' && (
                <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span>{language === 'hi' ? 'शरीर का तापमान' : 'Body Temperature'}</span>
                    </label>
                    <div className="flex items-center bg-white rounded-lg p-0.5 border border-orange-200 text-[11px] font-bold">
                      <button
                        type="button"
                        onClick={() => setTempUnit('F')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          tempUnit === 'F' ? 'bg-orange-600 text-white' : 'text-slate-600'
                        }`}
                      >
                        °F
                      </button>
                      <button
                        type="button"
                        onClick={() => setTempUnit('C')}
                        className={`px-2 py-0.5 rounded cursor-pointer ${
                          tempUnit === 'C' ? 'bg-orange-600 text-white' : 'text-slate-600'
                        }`}
                      >
                        °C
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.1"
                      value={temperatureF}
                      onChange={(e) => setTemperatureF(e.target.value)}
                      placeholder={tempUnit === 'F' ? '98.6' : '37.0'}
                      className="w-32 p-2 bg-white border border-orange-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-orange-500/30"
                    />
                    <div className="text-[11px] text-orange-900 leading-snug">
                      {language === 'hi'
                        ? 'सामान्य: 98.6°F (37°C) · बुखार: ≥ 100.4°F (38°C)'
                        : 'Normal: 98.6°F (37°C) · Fever: ≥ 100.4°F (38.0°C)'}
                    </div>
                  </div>
                </div>
              )}

              {/* Triggers multi-select chips */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'संभावित ट्रिगर या जोखिम' : 'Associated Exposure / Potential Triggers'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {commonTriggers.map((trig) => {
                    const isSelected = selectedTriggers.includes(trig);
                    return (
                      <button
                        type="button"
                        key={trig}
                        onClick={() => toggleTrigger(trig)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {trig}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clinical Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'नैदानिक विवरण एवं नोट्स' : 'Clinical Context & Notes'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'उदा. बिल्ली के संपर्क के 30 मिनट बाद शुरू; गुनगुना काढ़ा दिया गया; बच्चा तरल पदार्थ ले रहा है।'
                      : 'e.g. Occurred 30 mins after pet exposure; administered saline mist; child was able to sip fluids.'
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'hi' ? 'लक्षण रिकॉर्ड सहेजें' : 'Save Symptom Log Entry'}</span>
              </button>
            </form>
          )}

          {/* Quick Metrics */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'hi' ? 'कुल प्रविष्टियां' : 'Total Logs'}
              </span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">{stats.total}</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'hi' ? 'गंभीर घटनाएं' : 'Severe Events'}
              </span>
              <span className="text-lg font-bold text-rose-700 tabular-nums">{stats.severeCount}</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {language === 'hi' ? 'अधिकतम बुखार' : 'Max Fever'}
              </span>
              <span className="text-lg font-bold text-orange-700 tabular-nums">
                {stats.highestTemp ? `${stats.highestTemp}°F` : (language === 'hi' ? 'कोई नहीं' : 'None')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Symptom Timeline & History */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900 font-heading">
                {language === 'hi'
                  ? `दर्ज लक्षण समयरेखा (${logs.length})`
                  : `Logged Symptom Timeline (${logs.length})`}
              </h3>
            </div>
            {logs.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'इतिहास साफ़ करें' : 'Clear History'}</span>
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {language === 'hi' ? 'अभी तक कोई लक्षण दर्ज नहीं' : 'No Symptoms Recorded Yet'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {language === 'hi'
                  ? 'एलर्जी, मौसमी जुकाम या बाल रोग विशेषज्ञ के परामर्श के लिए एक व्यवस्थित रिकॉर्ड बनाने के लिए ऊपर लक्षण दर्ज करें।'
                  : 'Log the first symptom above to start building an organized timeline for allergies, seasonal colds, and pediatric visits.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const dateObj = new Date(log.timestamp);
                const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateStr = dateObj.toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                const severityStyle =
                  log.severity === 'severe'
                    ? 'border-rose-300 bg-rose-50/40 text-rose-800'
                    : log.severity === 'moderate'
                    ? 'border-amber-300 bg-amber-50/40 text-amber-800'
                    : 'border-emerald-300 bg-emerald-50/40 text-emerald-800';

                return (
                  <div
                    key={log.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-2xl mt-0.5">
                          {symptomCategories.find((c) => c.id === log.category)?.icon || '🩺'}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900 font-heading">
                              {log.symptomName}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${severityStyle}`}>
                              {log.severity}
                            </span>
                            {log.temperatureF && (
                              <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 font-bold text-[11px] flex items-center gap-1">
                                <Thermometer className="w-3 h-3 text-orange-600" />
                                <span>{log.temperatureF}°F ({log.temperatureC}°C)</span>
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{dateStr} ({timeStr})</span>
                            <span>·</span>
                            <span>{language === 'hi' ? 'आयु वर्ग:' : 'Age stage:'} {log.ageGroup} {language === 'hi' ? 'वर्ष' : 'yrs'}</span>
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="text-slate-300 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title={language === 'hi' ? 'प्रविष्टि हटाएं' : 'Delete entry'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Triggers Chips */}
                    {log.triggers.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="text-slate-400 font-medium">
                          {language === 'hi' ? 'ट्रिगर:' : 'Triggers:'}
                        </span>
                        {log.triggers.map((trig) => (
                          <span
                            key={trig}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                          >
                            {trig}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {log.notes && (
                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                        <span className="font-semibold text-slate-700">
                          {language === 'hi' ? 'निरीक्षण: ' : 'Observation: '}
                        </span>
                        {log.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Doctor Visit Report Modal */}
      {showDoctorReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {language === 'hi' ? 'बाल चिकित्सा क्लिनिकल सारांश' : 'Pediatric Clinical Visit Summary'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {language === 'hi' ? 'हेल्थपल्स गाइड लक्षण रिपोर्ट' : 'HealthPulse Guide Symptom Timeline Report'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDoctorReport(false)}
                className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'बंद करें' : 'Close'}
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-950">
                <strong>{language === 'hi' ? 'मरीज प्रोफ़ाइल:' : 'Patient Profile:'}</strong> {language === 'hi' ? 'आयु वर्ग' : 'Age Group'} {currentAge} · {language === 'hi' ? 'कुल प्रविष्टियां' : 'Total Logged Entries'}: {logs.length} · {language === 'hi' ? 'अधिकतम तापमान' : 'Max Temperature'}: {stats.highestTemp ? `${stats.highestTemp}°F` : (language === 'hi' ? 'सामान्य' : 'Normal range')}
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  {language === 'hi' ? 'कालानुक्रमिक लक्षण लॉग:' : 'Chronological Entry Log:'}
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  {logs.map((log) => (
                    <div key={log.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{log.symptomName}</span>
                          <span className="text-[10px] uppercase font-bold text-slate-500">
                            ({log.severity})
                          </span>
                        </div>
                        {log.notes && <p className="text-slate-600 mt-0.5">{log.notes}</p>}
                        {log.triggers.length > 0 && (
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {language === 'hi' ? 'ट्रिगर:' : 'Triggers:'} {log.triggers.join(', ')}
                          </span>
                        )}
                      </div>
                      <div className="text-right sm:shrink-0 text-slate-500">
                        {new Date(log.timestamp).toLocaleDateString()}
                        {log.temperatureF && (
                          <div className="font-bold text-orange-700">{log.temperatureF}°F</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                {language === 'hi'
                  ? 'डॉक्टर से परामर्श के लिए इसे प्रिंट करें या स्क्रीनशॉट लें।'
                  : 'Print or screenshot this summary for your pediatrician consultation.'}
              </span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'hi' ? 'प्रिंट / पीडीएफ सहेजें' : 'Print / Save as PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
