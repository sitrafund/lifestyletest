/**
 * Answers for questions 1-9
 */

const q1as = [
  {
    title: {
      en: '1',
      fi: '1',
      se: '1',
    },
    index: 101,
    co2e: null,
    multiplier: 1,
    tips: null,
  },
  {
    title: {
      en: '2',
      fi: '2',
      se: '2',
    },
    index: 102,
    co2e: null,
    multiplier: 2,
    tips: null,
  },
  {
    title: {
      en: '3',
      fi: '3',
      se: '3',
    },
    index: 103,
    co2e: null,
    multiplier: 3,
    tips: null,
  },
  {
    title: {
      en: '4',
      fi: '4',
      se: '4',
    },
    index: 104,
    co2e: null,
    multiplier: 4,
    tips: null,
  },
  {
    title: {
      en: '5',
      fi: '5',
      se: '5',
    },
    index: 105,
    co2e: null,
    multiplier: 5,
    tips: null,
  },
  {
    title: {
      en: 'More than 5',
      fi: 'yli 5',
      se: 'fler än 5',
    },
    index: 106,
    co2e: null,
    multiplier: 6,
    tips: null,
  },
];

const q2as = [
  {
    title: {
      en: 'Less than 20 m2',
      fi: 'alle 20 m2',
      se: 'under 20 m2',
    },
    index: 107,
    co2e: null,
    multiplier: [null, 16],
    tips: null,
  },
  {
    title: {
      en: '20 - 50 m2',
      fi: '20 - 50 m2',
      se: '20 - 50 m2',
    },
    index: 108,
    co2e: null,
    multiplier: [null, 43],
    tips: null,
  },
  {
    title: {
      en: '51 - 80 m2',
      fi: '51 - 80 m2',
      se: '51 - 80 m2',
    },
    index: 109,
    co2e: null,
    multiplier: [null, 67],
    tips: null,
  },
  {
    title: {
      en: '81 - 120 m2',
      fi: '81 - 120 m2',
      se: '81 - 120 m2',
    },
    index: 110,
    co2e: null,
    multiplier: [null, 100],
    tips: null,
  },
  {
    title: {
      en: '121 - 200 m2',
      fi: '121 - 200 m2',
      se: '121 - 200 m2',
    },
    index: 111,
    co2e: null,
    multiplier: [null, 168],
    tips: null,
  },
  {
    title: {
      en: 'More than 200 m2',
      fi: 'yli 200 m2',
      se: 'mer än 200 m2',
    },
    index: 112,
    co2e: null,
    multiplier: [null, 340],
    tips: null,
  },
];

const q3as = [
  {
    title: {
      en: 'Ecological electricity',
      fi: 'Ekosähköä',
      se: 'Miljömärkt el',
    },
    index: 113,
    co2e: null,
    multiplier: [0.007, null],
    tips: [68417, 68445, 68788],
  },
  {
    title: {
      en: 'Ordinary electricity',
      fi: 'Tavallista sähköä',
      se: 'Vanlig el',
    },
    index: 114,
    co2e: null,
    multiplier: [0.281, null],
    tips: [68417, 68445, 68460, 68788],
  },
];

const q4as = [
  {
    title: {
      en: 'Block of flats',
      fi: 'Kerrostalo',
      se: 'Höghus',
    },
    index: 115,
    co2e: null,
    multiplier: [8, 1400, 500, 42.72],
    tips: [67904, 68452, 68514, 68587, 68788],
  },
  {
    title: {
      en: 'Single-family house or semi-detached house',
      fi: 'Omakoti- tai paritalo',
      se: 'Egnahems- eller parhus',
    },
    index: 116,
    co2e: null,
    multiplier: [6.9, 4600, 900, 66.84],
    tips: [
      67904,
      67968,
      67973,
      67978,
      68514,
      68516,
      68528,
      68557,
      68587,
      68788,
    ],
  },
  {
    title: {
      en: 'Terraced house',
      fi: 'Rivitalo',
      se: 'Radhus',
    },
    index: 117,
    co2e: null,
    multiplier: [6.9, 2600, 700, 22.2872],
    tips: [
      67904,
      67968,
      67973,
      67978,
      68514,
      68516,
      68528,
      68557,
      68587,
      68788,
    ],
  },
];

const q5as = [
  {
    title: {
      en: 'Before 1990',
      fi: 'ennen 1990',
      se: 'innan 1990',
    },
    index: 118,
    co2e: null,
    multiplier: [240, null],
    tips: null,
  },
  {
    title: {
      en: '1990 - 2010',
      fi: '1990 - 2010',
      se: '1990 - 2010',
    },
    index: 119,
    co2e: null,
    multiplier: [160, null],
    tips: null,
  },
  {
    title: {
      en: 'After 2010',
      fi: '2010 jälkeen',
      se: 'efter 2010',
    },
    index: 120,
    co2e: null,
    multiplier: [130, null],
    tips: null,
  },
];

// TODO: co2e, multiplier and tips missing
const q6as = [
  {
    title: {
      en: 'Regular district heating',
      fi: 'Tavallinen kaukolämpö',
      se: 'Vanlig fjärrvärme',
    },
    index: 121,
    co2e: '',
    multiplier: [0.158, null],
    tips: [67973, 68528, 68546, 68411],
  },
  {
    title: {
      en: 'Green district heating / Wood or pellets',
      fi: 'Vihreä kaukolämpö / Puu tai pelletti',
      se: 'Grön fjärrvärme / Trä eller pellet',
    },
    index: 122,
    co2e: '',
    multiplier: [0.014, null],
    tips: [67973, 68528, 68546, 68411],
  },
  {
    title: {
      en: 'Light fuel oil',
      fi: 'Kevyt polttoöljy',
      se: 'Lätt brännolja',
    },
    index: 123,
    co2e: '',
    multiplier: [0.265, null],
    tips: [67973, 68528, 68546, 68411],
  },
  {
    title: {
      en: 'Electricity',
      fi: 'Sähkö',
      se: 'El',
    },
    index: 124,
    co2e: '',
    multiplier: [null, null],
    tips: [67973, 68414, 68445, 68516, 68528, 68546, 68411],
  },
  {
    title: {
      en: 'Natural gas',
      fi: 'Maakaasu',
      se: 'Naturgas',
    },
    index: 125,
    co2e: '',
    multiplier: [0.199, null],
    tips: [67973, 68528, 68546, 68411],
  },
  {
    title: {
      en: 'Ground-source heat pump or air-source heat pump',
      fi: 'Maalämpö tai Ilmalämpöpumppu',
      se: 'Jordvärme eller luftvärmepump',
    },
    index: 127,
    co2e: '',
    multiplier: [null, null],
    tips: [68528, 68546, 68411],
  },
  {
    title: {
      // tslint:disable-next-line:quotemark
      en: "I don't know",
      fi: 'En tiedä',
      se: 'Vet inte',
    },
    index: 128,
    co2e: '',
    multiplier: [0.158, null],
    tips: [67973, 68528, 68546, 68411],
  },
];

const q7as = [
  {
    title: {
      en: 'Southern Finland',
      fi: 'Etelä-Suomessa',
      se: 'Södra Finland',
    },
    index: 129,
    co2e: 0,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: 'Central Finland',
      fi: 'Maan keskiosassa',
      se: 'I landets mellersta delar',
    },
    index: 130,
    co2e: null,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: 'Northern Finland',
      fi: 'Pohjois-Suomessa',
      se: 'Norra Finland',
    },
    index: 131,
    co2e: null,
    multiplier: null,
    tips: null,
  },
];

const q8as = [
  {
    title: {
      en: 'Cool, about 19°C',
      fi: 'Viileä, noin 19°C',
      se: 'Svalt, cirka 19°C',
    },
    index: 132,
    co2e: null,
    multiplier: null,
    tips: [67904, 68411],
  },
  {
    title: {
      en: 'Moderate, about 21°C',
      fi: 'Kohtalainen, noin 21°C',
      se: 'Måttligt varmt, cirka 21°C',
    },
    index: 133,
    co2e: 0,
    multiplier: null,
    tips: [67857, 67904, 68411, 68546],
  },
  {
    title: {
      en: 'Warm, about 23°C',
      fi: 'Lämmin, noin 23°C',
      se: 'Varmt, cirka 23°C',
    },
    index: 134,
    co2e: null,
    multiplier: null,
    tips: [67857, 67904, 68411, 68546],
  },
];

const q9as = [
  {
    title: {
      en: 'About 30 minutes ',
      fi: 'noin 30 minuuttia ',
      se: 'cirka 30 minuter',
    },
    index: 135,
    co2e: -178,
    multiplier: null,
    tips: [67954],
  },
  {
    title: {
      en: 'About 60 minutes',
      fi: 'noin 60 minuuttia',
      se: 'cirka 60 minuter',
    },
    index: 136,
    co2e: 0,
    multiplier: null,
    tips: [67948, 67954],
  },
  {
    title: {
      en: 'About 120 minutes',
      fi: 'noin 120 minuuttia',
      se: 'cirka 120 minuter',
    },
    index: 137,
    co2e: 336,
    multiplier: null,
    tips: [67948, 67954],
  },
];

/**
 * Questions 1-9
 */

const cat1qs = [
  {
    index: 1,
    title: {
      en: 'How many people live in your household?',
      fi: 'Kuinka monta henkilöä kotitaloudessasi asuu?',
      se: 'Hur många personer bor i ditt hushåll?',
    },
    answers: q1as,
  },
  {
    index: 2,
    title: {
      en: 'What is the living area of your home?',
      fi: 'Kuinka iso on asuntosi asuinpinta-ala?',
      se: 'Hur stor är bostadsytan i din bostad?',
    },
    answers: q2as,
  },
  {
    index: 3,
    title: {
      en: 'What kind of electricity do you use?',
      fi: 'Mitä sähköä käytät?',
      se: 'Vilken el använder du?',
    },
    answers: q3as,
  },
  {
    index: 4,
    title: {
      en: 'What kind of house do you live in?',
      fi: 'Minkälaisessa talossa asut?',
      se: 'I hurdant hus bor du?',
    },
    answers: q4as,
  },
  {
    index: 5,
    title: {
      en: 'When was the house built?',
      fi: 'Milloin talo on rakennettu?',
      se: 'När är huset byggt?',
    },
    answers: q5as,
  },
  {
    index: 6,
    title: {
      en: 'What is the primary heating method of your home?',
      fi: 'Mikä on kotisi ensisijainen lämmitysmuoto?',
      se: 'Med vad värmer du i första hand ditt hem med?',
    },
    answers: q6as,
  },
  {
    index: 7,
    title: {
      en: 'Where in Finland do you live?',
      fi: 'Missä päin Suomea asut?',
      se: 'Var i Finland bor du?',
    },
    answers: q7as,
  },
  {
    index: 8,
    title: {
      en: 'What is the room temperature in your home in winter?',
      fi: 'Mikä on asuntosi huonelämpötila talvikaudella?',
      se: 'Hur varmt är det i din bostad under vintern?',
    },
    answers: q8as,
  },
  {
    index: 9,
    title: {
      en: 'How much time per week do you spend having a shower?',
      fi: 'Kuinka kauan olet suihkussa viikossa?',
      se: 'Hur länge duschar du i veckan?',
    },
    answers: q9as,
  },
];

export default cat1qs;
