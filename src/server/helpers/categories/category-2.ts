/**
 * Answers for questions 10-16
 */
const q10as = [
  {
    title: {
      en: 'I don’t drive',
      fi: 'en kulje autolla',
      se: 'jag kör inte bil',
    },
    index: 201,
    co2e: null,
    multiplier: 0,
    tips: null,
  },
  {
    title: {
      en: 'Less than 100 km',
      fi: 'alle 100 km',
      se: 'mindre än 100 km',
    },
    index: 202,
    co2e: null,
    multiplier: 3120,
    tips: [68593, 68595, 68597, 68601, 68613, 68615, 68617, 68619, 68621],
  },
  {
    title: {
      en: '100 - 400 km',
      fi: '100 - 400 km',
      se: '100 - 400 km',
    },
    index: 203,
    co2e: null,
    multiplier: 11960,
    tips: [
      68593,
      68595,
      68597,
      68601,
      68613,
      68615,
      68617,
      68619,
      68621,
      68623,
    ],
  },
  {
    title: {
      en: 'More than 400 km',
      fi: 'yli 400 km',
      se: 'mer än 400 km',
    },
    index: 204,
    co2e: null,
    multiplier: 36400,
    tips: [68593, 68595, 68597, 68613, 68615, 68619, 68621, 68623],
  },
];

const q11as = [
  {
    title: {
      en: 'Petrol',
      fi: 'Bensiinillä',
      se: 'Bensin',
    },
    index: 205,
    co2e: null,
    multiplier: [0.094, 0.06, null],
    tips: [68593, 68595],
  },
  {
    title: {
      en: 'Diesel',
      fi: 'Dieselillä',
      se: 'Diesel',
    },
    index: 206,
    co2e: null,
    multiplier: [0.083, 0.06, null],
    tips: [68593, 68595],
  },
  {
    title: {
      en: 'Gas or ethanol',
      fi: 'Kaasulla tai etanolilla',
      se: 'Gas eller etanol',
    },
    index: 207,
    co2e: null,
    multiplier: [0.025, 0.06, null],
    tips: [68593],
  },
  {
    title: {
      en: 'Electricity',
      fi: 'Sähköllä',
      se: 'El',
    },
    index: 208,
    co2e: null,
    multiplier: [null, 0.09, null],
    tips: [68595],
  },
  {
    title: {
      en: 'Hybrid',
      fi: 'Hybridillä',
      se: 'Hybrid',
    },
    index: 209,
    co2e: null,
    multiplier: [0.037, 0.09, null],
    tips: [68595],
  },
];

const q12as = [
  {
    title: {
      en: '4 or more people in addition to myself',
      fi: '4 tai useampi henkilöä lisäkseni',
      se: 'jag och 4 andra eller fler',
    },
    index: 210,
    co2e: null,
    multiplier: 5,
    tips: [68788],
  },
  {
    title: {
      en: '3 people in addition to myself',
      fi: '3 henkilöä lisäkseni',
      se: 'jag och 3 andra',
    },
    index: 211,
    co2e: null,
    multiplier: 4,
    tips: [68605, 68788],
  },
  {
    title: {
      en: '2 people in addition to myself',
      fi: '2 henkilöä lisäkseni',
      se: 'jag och 2 andra',
    },
    index: 212,
    co2e: null,
    multiplier: 3,
    tips: [68605, 68788],
  },
  {
    title: {
      en: '1 people in addition to myself',
      fi: '1 henkilö lisäkseni',
      se: 'jag och 1 annan',
    },
    index: 213,
    co2e: null,
    multiplier: 2,
    tips: [68599, 68605, 68788],
  },
  {
    title: {
      en: 'I drive on my own',
      fi: 'kuljen autolla yksin',
      se: 'jag åker bil ensam',
    },
    index: 214,
    co2e: null,
    multiplier: 1,
    tips: [68599, 68605, 68607, 68788],
  },
];

const q13as = [
  {
    title: {
      en: 'I don’t use public transport at all',
      fi: 'en käytä joukkoliikennettä lainkaan',
      se: 'jag använder inte kollektivtrafik alls',
    },
    index: 215,
    co2e: 0,
    multiplier: null,
    tips: [68619],
  },
  {
    title: {
      en: 'Less than 100 km',
      fi: 'alle 100 km',
      se: 'mindre än 100 km',
    },
    index: 216,
    co2e: 82,
    multiplier: null,
    tips: [68609, 68619],
  },
  {
    title: {
      en: '100-400 km',
      fi: '100 - 400 km',
      se: '100 - 400 km',
    },
    index: 217,
    co2e: 343,
    multiplier: null,
    tips: [68609],
  },
  {
    title: {
      en: 'More than 400 km',
      fi: 'yli 400 km',
      se: 'mer än 400 km',
    },
    index: 218,
    co2e: 735,
    multiplier: null,
    tips: [68609],
  },
];

const q14as = [
  {
    title: {
      en: 'I have not travelled by plane at all',
      fi: 'en ole lentänyt laisinkaan',
      se: 'jag har inte flugit alls',
    },
    index: 219,
    co2e: null,
    multiplier: 0,
    tips: null,
  },
  {
    title: {
      en: 'Less than 5 hours',
      fi: 'alle 5 tuntia',
      se: 'mindre än 5 timmar',
    },
    index: 220,
    co2e: null,
    multiplier: 668,
    tips: [68627, 68629, 68631, 68633],
  },
  {
    title: {
      en: '5-15 hours',
      fi: '5 - 15 tuntia',
      se: '5 - 15 timmar',
    },
    index: 221,
    co2e: null,
    multiplier: 2171,
    tips: [68627, 68629, 68631, 68633, 68635, 68647],
  },
  {
    title: {
      en: '15 - 30 hours',
      fi: '15 - 30 tuntia',
      se: '15 - 30 timmar',
    },
    index: 222,
    co2e: null,
    multiplier: 4259,
    tips: [68627, 68629, 68631, 68635, 68647],
  },
  {
    title: {
      en: 'More than 30 hours',
      fi: 'yli 30 tuntia',
      se: 'mer än 30 timmar',
    },
    index: 223,
    co2e: null,
    multiplier: 8517,
    tips: [68627, 68629, 68631, 68635, 68647],
  },
];

const q15as = [
  {
    title: {
      en: 'Yes',
      fi: 'kyllä',
      se: 'ja',
    },
    index: 224,
    co2e: 2,
    multiplier: 2,
    tips: null,
  },
  {
    title: {
      en: 'No',
      fi: 'ei',
      se: 'nej',
    },
    index: 225,
    co2e: 1,
    multiplier: 1,
    tips: [68772, 68778, 68780, 68788],
  },
];

const q16as = [
  {
    title: {
      en: 'I have not travelled by ferry',
      fi: 'en ole matkustanut laivalla',
      se: 'jag har inte rest med båt',
    },
    index: 226,
    co2e: 0,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: '1 - 4 trips',
      fi: '1 - 4 matkaa',
      se: '1-4 resor',
    },
    index: 227,
    co2e: 598,
    multiplier: null,
    tips: [68633, 68639],
  },
  {
    title: {
      en: '5 - 15 trips',
      fi: '5 - 15 matkaa',
      se: '5-15 resor',
    },
    index: 228,
    co2e: 2220,
    multiplier: null,
    tips: [68633, 68635, 68639],
  },
  {
    title: {
      en: 'More than 15 trips',
      fi: 'yli 15 matkaa',
      se: 'fler än 15 resor',
    },
    index: 229,
    co2e: 2904,
    multiplier: null,
    tips: [68633, 68635, 68639],
  },
];

/**
 * Questions 10-16
 */

const cat2qs = [
  {
    index: 10,
    title: {
      en: '1.	How many kilometres per week do you typically drive?',
      fi: 'Kuinka monta kilometriä kuljet tyypillisesti autolla viikossa?',
      se: 'Hur många kilometer kör du med bilen en vanlig vecka?',
    },
    answers: q10as,
  },
  {
    index: 11,
    title: {
      en: 'What does your car run on?',
      fi: 'Millä autosi kulkee?',
      se: 'Vad för bränsle använder din bil?',
    },
    answers: q11as,
  },
  {
    index: 12,
    title: {
      en: 'How many people usually travel with you in the car?',
      fi: 'Kuinka monen henkilön kanssa autoilet pääsääntöisesti?',
      se: 'Hur många personer brukar vanligtvis åka med dig i bilen?',
    },
    answers: q12as,
  },
  {
    index: 13,
    title: {
      en: 'How many kilometres per week do you travel by public transport?',
      fi: 'Kuinka monta kilometriä kuljet joukkoliikenteellä viikossa?',
      se: 'Hur många kilometer åker du kollektivtrafik i veckan?',
    },
    answers: q13as,
  },
  {
    index: 14,
    title: {
      en: 'How many hours have you travelled by plane in the past 12 months?',
      fi: 'Kuinka monta tuntia olet lentänyt viimeisen vuoden aikana?',
      se: 'Hur många timmar har du flugit det senaste året?',
    },
    answers: q14as,
  },
  {
    index: 15,
    title: {
      en:
        'Have you compensated for the emissions from your flights with voluntary carbon offset payments?',
      fi:
        'Oletko kompensoinut lentomatkustuksen päästöjä vapaaehtoisilla maksuilla?',
      se: 'Har du kompenserat flygtrafikens utsläpp med frivilliga avgifter?',
    },
    answers: q15as,
  },
  {
    index: 16,
    title: {
      en: 'How many return trips have you made by ferry in the past 12 months?',
      fi:
        'Kuinka monta edestakaista laivamatkaa olet tehnyt viimeisen vuoden aikana?',
      se: 'Hår många tur-retur-resor med båt har du gjort det senaste året?',
    },
    answers: q16as,
  },
];

export default cat2qs;
