import React, { useState, useMemo } from 'react';
import { AgeGroupId } from '../types';
import { getLocalizedAgeGroups } from '../data/articles';
import { useLanguage } from '../context/LanguageContext';
import {
  Scale,
  Sparkles,
  Info,
  RotateCcw,
} from 'lucide-react';

interface BmiCalculatorProps {
  currentAge: AgeGroupId;
}

export const BmiCalculator: React.FC<BmiCalculatorProps> = ({ currentAge }) => {
  const { language } = useLanguage();
  const localizedAgeGroups = getLocalizedAgeGroups(language);

  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [selectedAge, setSelectedAge] = useState<AgeGroupId>(
    currentAge === 'all' ? '10-14' : currentAge
  );

  // Imperial inputs
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(6);
  const [pounds, setPounds] = useState<number>(130);

  // Metric inputs
  const [cm, setCm] = useState<number>(168);
  const [kg, setKg] = useState<number>(59);

  // Calculate BMI
  const bmiData = useMemo(() => {
    let heightMeters = 0;
    let weightKg = 0;

    if (unitSystem === 'imperial') {
      const totalInches = (Number(feet) || 0) * 12 + (Number(inches) || 0);
      heightMeters = totalInches * 0.0254;
      weightKg = (Number(pounds) || 0) * 0.453592;
    } else {
      heightMeters = (Number(cm) || 0) / 100;
      weightKg = Number(kg) || 0;
    }

    if (heightMeters <= 0 || weightKg <= 0) {
      return {
        bmi: 0,
        category: language === 'hi' ? 'अमान्य मान' : 'Invalid Input',
        color: 'text-slate-400',
        band: 'none',
        angle: 0,
        badgeBg: 'bg-slate-100 text-slate-700',
      };
    }

    const rawBmi = weightKg / (heightMeters * heightMeters);
    const bmi = parseFloat(rawBmi.toFixed(1));

    // Gauge angle (-90 deg to +90 deg over a 180 deg semi-circle)
    const clampedBmi = Math.max(15, Math.min(35, bmi));
    const normalized = (clampedBmi - 15) / (35 - 15);
    const angle = -90 + normalized * 180;

    let category = '';
    let color = '';
    let badgeBg = '';
    let band: 'under' | 'normal' | 'over' | 'obese' = 'normal';

    if (bmi < 18.5) {
      category = language === 'hi' ? 'कम वजन (Underweight)' : 'Underweight';
      color = 'text-sky-700';
      badgeBg = 'bg-sky-50 border-sky-200 text-sky-800';
      band = 'under';
    } else if (bmi < 25.0) {
      category = language === 'hi' ? 'सामान्य एवं स्वस्थ श्रेणी (Normal)' : 'Normal / Healthy Range';
      color = 'text-emerald-700';
      badgeBg = 'bg-emerald-50 border-emerald-200 text-emerald-800';
      band = 'normal';
    } else if (bmi < 30.0) {
      category = language === 'hi' ? 'अधिक वजन (Overweight)' : 'Overweight';
      color = 'text-amber-700';
      badgeBg = 'bg-amber-50 border-amber-200 text-amber-800';
      band = 'over';
    } else {
      category = language === 'hi' ? 'मोटापा श्रेणी (Obese)' : 'Obesity Range';
      color = 'text-rose-700';
      badgeBg = 'bg-rose-50 border-rose-200 text-rose-800';
      band = 'obese';
    }

    return { bmi, category, color, badgeBg, band, angle };
  }, [unitSystem, feet, inches, pounds, cm, kg, language]);

  const isPediatricOrTeen =
    selectedAge === '5-9' || selectedAge === '10-14' || selectedAge === '14-18';

  const resetDefaults = () => {
    if (unitSystem === 'imperial') {
      setFeet(5);
      setInches(6);
      setPounds(130);
    } else {
      setCm(168);
      setKg(59);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? 'विकास एवं शारीरिक संरचना स्क्रीनिंग'
                : 'Growth & Body Composition Screening'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            {language === 'hi'
              ? 'बीएमआई एवं विकास जांच कैलकुलेटर'
              : 'BMI & Growth Screening Calculator'}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'इंटरैक्टिव विजुअल गेज के साथ बॉडी मास इंडेक्स (BMI) की गणना करें और आयु वर्ग के अनुसार सटीक बाल व वयस्क स्वास्थ्य परामर्श प्राप्त करें।'
              : 'Calculate Body Mass Index with interactive visual gauge metrics and tailored pediatric and adult clinical health interpretations.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              {language === 'hi' ? 'व्यक्तिगत माप दर्ज करें' : 'Personal Measurements'}
            </h3>
            {/* Units Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold border border-slate-200">
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'hi' ? 'इंपीरियल (ft / lbs)' : 'Imperial (ft / lbs)'}
              </button>
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'hi' ? 'मीट्रिक (cm / kg)' : 'Metric (cm / kg)'}
              </button>
            </div>
          </div>

          {/* Age Bracket Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>{language === 'hi' ? 'लक्षित आयु वर्ग' : 'Target Age Bracket'}</span>
              <span className="text-[11px] text-teal-700 font-normal lowercase">
                {language === 'hi' ? '(परामर्श अनुकूलित करता है)' : '(calibrates guidance)'}
              </span>
            </label>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value as AgeGroupId)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30 cursor-pointer"
            >
              {localizedAgeGroups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label} ({g.category})
                </option>
              ))}
            </select>
          </div>

          {/* Inputs Section */}
          {unitSystem === 'imperial' ? (
            <div className="space-y-4">
              {/* Height Feet & Inches */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {language === 'hi' ? 'ऊंचाई (फीट एवं इंच)' : 'Height (Feet & Inches)'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min={2}
                      max={7}
                      value={feet}
                      onChange={(e) => setFeet(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 pr-8 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                      {language === 'hi' ? 'फीट' : 'ft'}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={11}
                      value={inches}
                      onChange={(e) => setInches(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 pr-8 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                      {language === 'hi' ? 'इंच' : 'in'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Weight Pounds */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {language === 'hi' ? 'वजन (पाउंड)' : 'Weight (Pounds)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={20}
                    max={450}
                    value={pounds}
                    onChange={(e) => setPounds(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 pr-10 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                    {language === 'hi' ? 'पाउंड' : 'lbs'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Metric Inputs */
            <div className="space-y-4">
              {/* Height Centimeters */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {language === 'hi' ? 'ऊंचाई (सेंटीमीटर)' : 'Height (Centimeters)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={60}
                    max={230}
                    value={cm}
                    onChange={(e) => setCm(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 pr-10 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                    {language === 'hi' ? 'सेमी' : 'cm'}
                  </span>
                </div>
              </div>

              {/* Weight Kilograms */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {language === 'hi' ? 'वजन (किलोग्राम)' : 'Weight (Kilograms)'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={10}
                    max={200}
                    value={kg}
                    onChange={(e) => setKg(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 pr-10 focus:outline-hidden focus:ring-2 focus:ring-teal-600/30"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">
                    {language === 'hi' ? 'किग्रा' : 'kg'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={resetDefaults}
              className="text-xs text-slate-500 hover:text-teal-700 underline flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'मान रीसेट करें' : 'Reset Values'}</span>
            </button>
            <span className="text-[11px] text-slate-400 font-medium">
              {language === 'hi' ? 'वास्तविक समय में गणना' : 'Real-time automatic calculation'}
            </span>
          </div>
        </div>

        {/* Right Column: Visual Gauge Chart & Results */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                  {language === 'hi' ? 'स्क्रीनिंग परिणाम' : 'Screening Metric'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  {language === 'hi' ? 'आपका बीएमआई परिणाम' : 'Your BMI Result'}
                </h3>
              </div>
              <div className={`px-3 py-1 rounded-lg border text-xs font-bold ${bmiData.badgeBg}`}>
                {bmiData.category}
              </div>
            </div>

            {/* Visual Semi-Circular Gauge Chart */}
            <div className="relative flex flex-col items-center justify-center pt-2 pb-4">
              <svg viewBox="0 0 200 120" className="w-64 sm:w-72 overflow-visible">
                {/* Gauge Background Arcs */}
                <path
                  d="M 20 100 A 80 80 0 0 1 45 45"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 40 A 80 80 0 0 1 100 20 A 80 80 0 0 1 140 35"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="16"
                />
                <path
                  d="M 145 40 A 80 80 0 0 1 175 75"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="16"
                />
                <path
                  d="M 177 80 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="16"
                  strokeLinecap="round"
                />

                {/* Animated Needle */}
                <g
                  transform={`rotate(${bmiData.angle}, 100, 100)`}
                  className="transition-transform duration-500 ease-out"
                >
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="30"
                    stroke="#1e293b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="100" r="6" fill="#0f172a" />
                </g>
              </svg>

              {/* Central Value */}
              <div className="text-center -mt-4">
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-heading tabular-nums">
                  {bmiData.bmi}
                </div>
                <div className="text-xs text-slate-500 font-semibold tracking-wide mt-0.5">
                  {language === 'hi' ? 'किग्रा / मी² बॉडी मास इंडेक्स' : 'kg / m² Body Mass Index'}
                </div>
              </div>

              {/* Gauge Legend */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span>{language === 'hi' ? 'कम वजन (<18.5)' : 'Underweight (<18.5)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>{language === 'hi' ? 'स्वस्थ (18.5–24.9)' : 'Normal (18.5–24.9)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>{language === 'hi' ? 'अधिक वजन (25–29.9)' : 'Overweight (25–29.9)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>{language === 'hi' ? 'मोटापा (≥30)' : 'Obese (≥30)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Age-Appropriate Clinical Guidance Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-heading uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>
                {language === 'hi'
                  ? `${selectedAge} वर्ष के लिए आयु-विशिष्ट परामर्श:`
                  : `Age-Appropriate Guidance for ${selectedAge} Years:`}
              </span>
            </div>

            {isPediatricOrTeen ? (
              <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>{language === 'hi' ? 'बच्चों एवं किशोरों के विकास का नियम:' : 'Youth Growth & Puberty Notice:'}</strong>{' '}
                  {language === 'hi'
                    ? '5–18 वर्ष के बच्चों में बीएमआई का मूल्यांकन वयस्कों की तरह केवल एक संख्या से नहीं होता। बाल रोग विशेषज्ञ आयु-और-लिंग विकास चार्ट (BMI-for-age percentiles) के आधार पर इसका विश्लेषण करते हैं (5वीं से 85वीं परसेंटाइल स्वस्थ मानी जाती है)।'
                    : 'In children and teenagers aged 5–18, single BMI numbers are not evaluated using adult cutoffs. Pediatricians interpret BMI relative to age-and-sex growth charts (BMI-for-age percentiles: 5th to 85th percentile is healthy).'}
                </p>
                <ul className="pl-4 list-disc space-y-1 text-slate-600">
                  <li>
                    {language === 'hi'
                      ? 'किशोरावस्था के विकास के दौरान कभी भी भोजन में अत्यधिक कटौती न करें; प्रोटीन, कैल्शियम और जिंक युक्त आहार दें।'
                      : 'Never restrict calories during puberty growth spurts; prioritize calcium, zinc, and protein density.'}
                  </li>
                  <li>
                    {language === 'hi'
                      ? 'खेलकूद करने वाले युवाओं में मांसपेशियों का वजन अधिक होने से बीएमआई सामान्य से अधिक दिख सकता है, जो कि स्वस्थ है।'
                      : 'Athletes with high muscle mass naturally score higher on BMI charts without excess body fat.'}
                  </li>
                  <li>
                    {language === 'hi'
                      ? 'नियमित बाल रोग विशेषज्ञ से परामर्श लें ताकि बच्चे की ऊंचाई और वजन की सही गति का पता चल सके।'
                      : 'Schedule regular pediatric check-ups to track linear height velocity and growth curves over time.'}
                  </li>
                </ul>
              </div>
            ) : selectedAge === '50+' ? (
              <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>{language === 'hi' ? 'वरिष्ठ नागरिकों के लिए स्वास्थ्य सुझाव:' : 'Mature Adult Health Notice:'}</strong>{' '}
                  {language === 'hi'
                    ? '50 वर्ष से अधिक उम्र के वयस्कों के लिए थोड़ा अधिक भंडार (बीएमआई 23-27) हड्डियों के घनत्व और मौसमी संक्रमणों से लड़ने के लिए लाभकारी माना जाता है।'
                    : 'For adults aged 50 and above, maintaining slightly higher reserves (BMI 23–27) is clinically associated with greater bone mineral density and resilience against seasonal infections.'}
                </p>
                <ul className="pl-4 list-disc space-y-1 text-slate-600">
                  <li>
                    {language === 'hi'
                      ? 'उम्र बढ़ने के साथ मांसपेशियों के नुकसान (सार्कोपेनिया) को रोकने के लिए नियमित हल्का शक्ति व्यायाम करें।'
                      : 'Focus on resistance training to combat age-related muscle loss (sarcopenia).'}
                  </li>
                  <li>
                    {language === 'hi'
                      ? 'पर्याप्त प्रोटीन (1.0-1.2 ग्राम प्रति किग्रा वजन) और विटामिन D3 का सेवन सुनिश्चित करें।'
                      : 'Ensure adequate dietary protein (1.0–1.2g per kg body weight) and Vitamin D3.'}
                  </li>
                  <li>
                    {language === 'hi'
                      ? 'जोड़ों की सुरक्षा के लिए प्रतिदिन कम से कम 30 मिनट तेज पैदल चलें।'
                      : 'Prioritize low-impact aerobic walking to preserve joint cartilage.'}
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>{language === 'hi' ? 'वयस्क मेटाबोलिक स्वास्थ्य:' : 'Adult Metabolic Wellness:'}</strong>{' '}
                  {language === 'hi'
                    ? 'कामकाजी वयस्कों और युवा माता-पिता के लिए बीएमआई एक प्रारंभिक संकेतक है। इसके साथ कमर का घेरा, शारीरिक सहनशक्ति और रक्त जांच समग्र स्वास्थ्य का सही आकलन करते हैं।'
                    : 'For working adults and young parents, BMI serves as a general baseline indicator. Cardiovascular stamina, waist-to-hip ratio, and lipid panel bloodwork provide a more holistic evaluation.'}
                </p>
                <ul className="pl-4 list-disc space-y-1 text-slate-600">
                  <li>
                    {language === 'hi'
                      ? 'प्रति सप्ताह कम से कम 150 मिनट मध्यम तीव्रता का व्यायाम या चलना सुनिश्चित करें।'
                      : 'Target at least 150 minutes of moderate-intensity cardiovascular activity per week.'}
                  </li>
                  <li>
                    {language === 'hi'
                      ? 'आंतों के माइक्रोबायोम को मजबूत करने के लिए सप्ताह में विभिन्न प्रकार के फल, सब्जियां और दालें खाएं।'
                      : 'Aim for 30 distinct plant foods weekly to foster gut microbiome diversity.'}
                  </li>
                  <li>
                    {language === 'hi'
                      ? 'हार्मोन संतुलन और तनाव कम करने के लिए 7-9 घंटे की नियमित नींद लें।'
                      : 'Prioritize 7–9 hours of consistent sleep to keep metabolic cortisol in balance.'}
                  </li>
                </ul>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>{language === 'hi' ? 'अस्वीकरण:' : 'Disclaimer:'}</strong>{' '}
                {language === 'hi'
                  ? 'बीएमआई केवल एक स्क्रीनिंग सूत्र है और यह शरीर के वसा प्रतिशत या हड्डियों की संरचना को सीधे नहीं मापता। व्यक्तिगत चिकित्सकीय सलाह के लिए हमेशा डॉक्टर से संपर्क करें।'
                  : 'BMI is a screening formula (kg/m²) and does not directly measure body fat percentage, hydration, or bone structure. Always consult a physician for individualized health evaluations.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
