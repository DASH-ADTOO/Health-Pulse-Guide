import { IndianHelpline } from '../types';

export const INDIAN_HELPLINES: IndianHelpline[] = [
  {
    number: '112',
    title: 'National Emergency Response Service (NERS)',
    subtitle: 'Unified All-India Emergency Number',
    description:
      'Single emergency helpline across all Indian states and Union Territories integrating Police, Fire, Ambulance, and Disaster Response. Operational 24/7 with GPS vehicle tracking.',
    category: 'emergency',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English', 'Regional State Languages'],
    keyUseCases: [
      'Immediate life-threatening accidents or injury',
      'Severe acute respiratory arrest or shock',
      'Rapid police, fire, or ambulance dispatch',
    ],
    highlight: true,
  },
  {
    number: '108',
    title: 'Emergency Medical & Ambulance Service',
    subtitle: 'Toll-Free Rapid Ambulance Dispatch',
    description:
      'Free, state-contracted emergency ambulance service operational in 23+ states and UTs with Basic and Advanced Life Support (ALS/BLS) ambulances and trained emergency medical technicians (EMTs).',
    category: 'emergency',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English', 'State Regional Languages'],
    keyUseCases: [
      'Severe asthma attacks and respiratory distress',
      'Sudden allergic anaphylaxis and collapse',
      'High-grade pediatric convulsions/febrile seizures',
      'Road traffic trauma and unconsciousness',
    ],
    highlight: true,
  },
  {
    number: '102',
    title: 'Janani Shishu Suraksha Karyakram (JSSK)',
    subtitle: 'Free Maternal & Infant Ambulance Service',
    description:
      'Government of India initiative providing completely free referral transport for pregnant women and sick neonates/infants (up to 1 year) to public health facilities and district hospitals.',
    category: 'maternal-child',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English', 'Regional Languages'],
    keyUseCases: [
      'Sick infant with continuous high fever or lethargy',
      'Neonatal breathing difficulties or dehydration',
      'Labor and emergency maternity transfer',
      'Post-discharge drop back for mother and baby',
    ],
    highlight: false,
  },
  {
    number: '104',
    title: 'National Health Helpline / DISHA',
    subtitle: 'Medical Advice & Health Directory',
    description:
      'State-run 24/7 health advisory helpline providing medical consultation from qualified doctors, minor ailment advice, directory of blood banks, antivenom availability, and government health schemes.',
    category: 'advisory',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English', 'State Languages'],
    keyUseCases: [
      'Non-critical pediatric fever & cough guidance',
      'Verifying nearest hospital with pediatric ICU beds',
      'Locating rare blood groups and anti-rabies vaccines',
      'Ayushman Bharat and state health card queries',
    ],
    highlight: false,
  },
  {
    number: '1075',
    title: 'National Health Mission (MoHFW)',
    subtitle: 'Infectious Disease & Public Health Helpline',
    description:
      'Ministry of Health and Family Welfare (MoHFW) central helpline for viral outbreaks, infectious disease alerts, national immunization schedules, seasonal influenza, and COVID-19/dengue guidelines.',
    category: 'advisory',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English'],
    keyUseCases: [
      'Seasonal viral outbreaks (Dengue, Chikungunya, H1N1)',
      'Universal Immunization Programme (UIP) vaccine schedules',
      'Official public health travel and quarantine advisories',
    ],
    highlight: false,
  },
  {
    number: '14416',
    title: 'Tele-MANAS',
    subtitle: 'National Tele Mental Health Programme of India',
    description:
      'Launched by MoHFW and NIMHANS Bengaluru, Tele-MANAS provides free, confidential 24/7 mental health counseling and crisis intervention by trained clinical psychologists and psychiatrists.',
    category: 'mental-health',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['20+ Scheduled Indian Languages'],
    keyUseCases: [
      'Severe youth anxiety, panic attacks, or exam stress',
      'Adolescent emotional distress and depression',
      'Caregiver burnout and postpartum anxiety in new mothers',
      'Substance abuse counseling and de-addiction triage',
    ],
    highlight: true,
  },
  {
    number: '1098',
    title: 'CHILDLINE India Foundation',
    subtitle: '24-Hour Emergency Child Distress Helpline',
    description:
      'Nationwide initiative of the Ministry of Women and Child Development (MWCD) responding to children in need of medical emergency rescue, care, protection, and crisis shelter.',
    category: 'maternal-child',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English', 'Local Languages'],
    keyUseCases: [
      'Children in urgent medical neglect or distress',
      'Immediate crisis shelter and emergency pediatric triage',
      'Child protection and runaway youth assistance',
    ],
    highlight: false,
  },
  {
    number: '1800-11-6655',
    title: 'National Poison Information Centre (NPIC)',
    subtitle: 'AIIMS New Delhi Toxicological Advisory',
    description:
      'Official toxicological emergency center at the All India Institute of Medical Sciences (AIIMS), New Delhi. Provides instant antidote and clinical protocol advice for accidental poison ingestion, chemical exposure, or snakebites.',
    category: 'poison',
    tollFree: true,
    hours: '24/7 / 365 Days',
    languages: ['Hindi', 'English'],
    keyUseCases: [
      'Accidental ingestion of household cleaning chemicals or detergents',
      'Pediatric accidental medicine/paracetamol overdose',
      'Insecticide, pesticide, or toxic plant exposure',
      'Snakebite or scorpion sting first-aid guidance',
    ],
    highlight: true,
  },
  {
    number: '1800-11-2356',
    title: 'National AIDS Control Organization (NACO)',
    subtitle: 'Blood Bank Directory & STI/HIV Advisory',
    description:
      'Toll-free national line for locating licensed government and charitable blood donation centers, component separation facilities, and post-exposure prophylaxis.',
    category: 'advisory',
    tollFree: true,
    hours: '9:00 AM - 9:00 PM',
    languages: ['Hindi', 'English'],
    keyUseCases: [
      'Locating verified blood banks and plasma in emergencies',
      'Safe voluntary blood donation and transfusion protocols',
    ],
  },
];

export const INDIAN_HELPLINES_HI: IndianHelpline[] = [
  {
    number: '112',
    title: 'राष्ट्रीय आपातकालीन प्रतिक्रिया सेवा (NERS)',
    subtitle: 'एकीकृत अखिल भारतीय आपातकालीन नंबर',
    description:
      'भारत के सभी राज्यों और केंद्र शासित प्रदेशों में पुलिस, दमकल, एम्बुलेंस और आपदा राहत को जोड़ने वाली एकल हेल्पलाइन। जीपीएस वाहन ट्रैकिंग के साथ 24 घंटे सातों दिन कार्यरत।',
    category: 'emergency',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी', 'राज्य क्षेत्रीय भाषाएं'],
    keyUseCases: [
      'जीवन के लिए घातक दुर्घटना या अचानक गंभीर चोट',
      'गंभीर श्वसन अवरोध (सांस रुकना) या आघात',
      'त्वरित पुलिस, दमकल या एम्बुलेंस सहायता',
    ],
    highlight: true,
  },
  {
    number: '108',
    title: 'आपातकालीन चिकित्सा एवं एम्बुलेंस सेवा',
    subtitle: 'निःशुल्क त्वरित एम्बुलेंस सेवा',
    description:
      '23 से अधिक राज्यों में बेसिक और एडवांस्ड लाइफ सपोर्ट (ALS/BLS) एम्बुलेंस और प्रशिक्षित ईएमटी कर्मियों के साथ चौबीसों घंटे संचालित सरकारी आपातकालीन सेवा।',
    category: 'emergency',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी', 'राज्य की क्षेत्रीय भाषाएं'],
    keyUseCases: [
      'दमे का गंभीर दौरा और सांस लेने में अत्यधिक कठिनाई',
      'अचानक तीव्र खाद्य एलर्जी (एनाफिलेक्सिस) और बेहोशी',
      'बच्चों में तेज बुखार के झटके (फेब्राइल सीजर)',
      'सड़क दुर्घटना और गंभीर आघात',
    ],
    highlight: true,
  },
  {
    number: '102',
    title: 'जननी शिशु सुरक्षा कार्यक्रम (JSSK)',
    subtitle: 'निःशुल्क मातृ एवं नवजात शिशु एम्बुलेंस',
    description:
      'भारत सरकार की पहल जो गर्भवती महिलाओं और 1 वर्ष तक के बीमार शिशुओं को सरकारी अस्पतालों और स्वास्थ्य केंद्रों तक पूरी तरह मुफ्त आवागमन की सुविधा देती है।',
    category: 'maternal-child',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय भाषाएं'],
    keyUseCases: [
      'बीमार नवजात शिशु में तेज बुखार या अत्यधिक सुस्ती',
      'शिशु को सांस लेने में तकलीफ या गंभीर डिहाइड्रेशन',
      'प्रसव पीड़ा और आपातकालीन प्रसूति अस्पताल स्थानांतरण',
      'अस्पताल से छुट्टी के बाद मां और बच्चे को घर छोड़ना',
    ],
    highlight: false,
  },
  {
    number: '104',
    title: 'राष्ट्रीय स्वास्थ्य हेल्पलाइन / दिशा (DISHA)',
    subtitle: 'चिकित्सा सलाह एवं स्वास्थ्य निर्देशिका',
    description:
      'योग्य डॉक्टरों द्वारा 24 घंटे निःशुल्क टेली-परामर्श, सामान्य बीमारियों की सलाह, नजदीकी ब्लड बैंक की जानकारी, एंटी-वेनम की उपलब्धता और आयुष्मान भारत योजनाओं की जानकारी।',
    category: 'advisory',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी', 'राज्य भाषाएं'],
    keyUseCases: [
      'बच्चों में बुखार, खांसी और दस्त पर गैर-आपातकालीन सलाह',
      'नजदीकी बाल रोग आईसीयू (PICU) बेड वाले अस्पताल की खोज',
      'एंटी-रेबीज वैक्सीन और दुर्लभ रक्त समूहों की उपलब्धता',
      'आयुष्मान भारत एवं सरकारी स्वास्थ्य कार्ड संबंधी प्रश्न',
    ],
    highlight: false,
  },
  {
    number: '1075',
    title: 'राष्ट्रीय स्वास्थ्य मिशन (MoHFW)',
    subtitle: 'संक्रामक रोग एवं जन स्वास्थ्य हेल्पलाइन',
    description:
      'स्वास्थ्य एवं परिवार कल्याण मंत्रालय (MoHFW) की केंद्रीय हेल्पलाइन जो मौसमी वायरल प्रकोप (डेंगू, चिकनगुनिया), राष्ट्रीय टीकाकरण कार्यक्रम और स्वास्थ्य सलाह प्रदान करती है।',
    category: 'advisory',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी'],
    keyUseCases: [
      'मौसमी वायरल बीमारियां (डेंगू, चिकनगुनिया, इन्फ्लूएंजा)',
      'राष्ट्रीय सार्वभौमिक टीकाकरण (UIP) समय-सारणी',
      'आधिकारिक जन स्वास्थ्य एवं यात्रा परामर्श',
    ],
    highlight: false,
  },
  {
    number: '14416',
    title: 'टेली-मानस (Tele-MANAS)',
    subtitle: 'भारत का राष्ट्रीय टेली मानसिक स्वास्थ्य कार्यक्रम',
    description:
      'MoHFW और निम्हांस (NIMHANS) बेंगलुरु द्वारा संचालित, प्रशिक्षित मनोवैज्ञानिकों और मनोचिकित्सकों द्वारा 24 घंटे पूरी तरह निःशुल्क और गोपनीय मानसिक स्वास्थ्य परामर्श।',
    category: 'mental-health',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['20+ भारतीय भाषाएं'],
    keyUseCases: [
      'युवाओं में परीक्षा तनाव, तीव्र चिंता या पैनिक अटैक',
      'किशोरों में अवसाद, अकेलापन और भावनात्मक संघर्ष',
      'अभिभावकों में तनाव और नई माताओं में प्रसवोत्तर अवसाद',
      'नशा मुक्ति और मानसिक संकट ट्राइएज',
    ],
    highlight: true,
  },
  {
    number: '1098',
    title: 'चाइल्डलाइन इंडिया (CHILDLINE)',
    subtitle: '24 घंटे आपातकालीन बाल संकट सहायता',
    description:
      'महिला एवं बाल विकास मंत्रालय की राष्ट्रव्यापी पहल जो संकटग्रस्त, बीमार, असहाय या आपातकालीन चिकित्सा की आवश्यकता वाले बच्चों की तत्काल सहायता करती है।',
    category: 'maternal-child',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी', 'स्थानीय भाषाएं'],
    keyUseCases: [
      'आपातकालीन चिकित्सा उपेक्षा या संकट में फंसे बच्चे',
      'तत्काल आपातकालीन बाल ट्राइएज और आश्रय',
      'बाल संरक्षण और संकटग्रस्त किशोरों की सहायता',
    ],
    highlight: false,
  },
  {
    number: '1800-11-6655',
    title: 'राष्ट्रीय विष सूचना केंद्र (NPIC) - एम्स नई दिल्ली',
    subtitle: 'AIIMS नई दिल्ली विष विज्ञान परामर्श',
    description:
      'अखिल भारतीय आयुर्विज्ञान संस्थान (AIIMS) नई दिल्ली का आधिकारिक केंद्र। गलती से फिनाइल/केमिकल पीने, दवा की अधिक खुराक या सांप/बिच्छू के काटने पर तत्काल प्राथमिक उपचार और एंटीडोट सलाह।',
    category: 'poison',
    tollFree: true,
    hours: '24/7 / 365 दिन',
    languages: ['हिंदी', 'अंग्रेजी'],
    keyUseCases: [
      'घर के फिनाइल, डिटर्जेंट या सफाई रसायनों का गलती से सेवन',
      'बच्चों द्वारा गलती से अधिक दवा या पैरासिटामोल निगल लेना',
      'कीटनाशक, मच्छर मारने वाली दवा या जहरीले पौधों का संपर्क',
      'सांप के काटने या बिच्छू के डंक पर तत्काल जीवनरक्षक सलाह',
    ],
    highlight: true,
  },
  {
    number: '1800-11-2356',
    title: 'राष्ट्रीय एड्स नियंत्रण संगठन (NACO)',
    subtitle: 'ब्लड बैंक निर्देशिका एवं स्वास्थ्य परामर्श',
    description:
      'आपातकालीन स्थिति में लाइसेंस प्राप्त सरकारी और धर्मार्थ ब्लड बैंकों, प्लाज्मा केंद्रों और घटक पृथक्करण सुविधाओं का पता लगाने के लिए टोल-फ्री राष्ट्रीय हेल्पलाइन।',
    category: 'advisory',
    tollFree: true,
    hours: 'सुबह 9:00 - रात 9:00',
    languages: ['हिंदी', 'अंग्रेजी'],
    keyUseCases: [
      'आपात स्थिति में सत्यापित ब्लड बैंक और प्लाज्मा खोजना',
      'सुरक्षित स्वैच्छिक रक्तदान और रक्त चढ़ाने के नियम',
    ],
    highlight: false,
  },
];

export function getLocalizedHelplines(language: string): IndianHelpline[] {
  return language === 'hi' ? INDIAN_HELPLINES_HI : INDIAN_HELPLINES;
}
