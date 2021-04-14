/**
 * Answers for question 17-23
 */
const q17as = [
  {
    title: {
      en: 'Less',
      fi: 'vähemmän',
      se: 'mindre',
    },
    index: 301,
    co2e: 1360,
    multiplier: 0.85,
    tips: null,
  },
  {
    title: {
      en: 'About the same amount ',
      fi: 'suunnilleen saman verran ',
      se: 'ungefär lika mycket',
    },
    index: 302,
    co2e: 1600,
    multiplier: 1,
    tips: null,
  },
  {
    title: {
      en: 'More',
      fi: 'enemmän',
      se: 'mer',
    },
    index: 303,
    co2e: 1840,
    multiplier: 1.15,
    tips: [68686],
  },
];
const q18as = [
  {
    title: {
      en: 'Never',
      fi: 'en lainkaan',
      se: 'inte alls',
    },
    index: 304,
    co2e: -322,
    multiplier: 0,
    tips: null,
  },
  {
    title: {
      en: '1 - 3 times a week',
      fi: '1 - 3 kertaa viikossa',
      se: '1-3 gånger i veckan',
    },
    index: 305,
    co2e: -207,
    multiplier: 2.6,
    tips: [
      68651,
      68653,
      68655,
      68657,
      68659,
      68661,
      68665,
      68667,
      68669,
      68671,
    ],
  },
  {
    title: {
      en: '4 - 7 times a week',
      fi: '4 - 7 kertaa viikossa',
      se: '4-7  gånger i veckan',
    },
    index: 306,
    co2e: -61,
    multiplier: 5.9,
    tips: [
      68651,
      68653,
      68655,
      68657,
      68659,
      68661,
      68665,
      68667,
      68669,
      68671,
    ],
  },
  {
    title: {
      en: 'Several times a day',
      fi: 'useita kertoja päivässä',
      se: 'flera gånger om dagen',
    },
    index: 307,
    co2e: 730,
    multiplier: 23.8,
    tips: [
      68651,
      68653,
      68655,
      68657,
      68659,
      68661,
      68665,
      68667,
      68669,
      68671,
    ],
  },
];

const q19as = [
  {
    title: {
      en: 'Never',
      fi: 'en lainkaan',
      se: 'inte alls',
    },
    index: 308,
    co2e: -412,
    multiplier: 0,
    tips: null,
  },
  {
    title: {
      en: '1 - 3 times a week',
      fi: '1 - 3 kertaa viikossa',
      se: '1-3 gånger i veckan',
    },
    index: 309,
    co2e: -358,
    multiplier: 2.6,
    tips: [
      68651,
      68653,
      68655,
      68659,
      68661,
      68663,
      68665,
      68667,
      68669,
      68671,
    ],
  },
  {
    title: {
      en: '4 - 7 times a week',
      fi: '4 - 7 kertaa viikossa',
      se: '4-7  gånger i veckan',
    },
    index: 310,
    co2e: -290,
    multiplier: 5.9,
    tips: [
      68651,
      68653,
      68655,
      68659,
      68661,
      68663,
      68665,
      68667,
      68669,
      68671,
    ],
  },
  {
    title: {
      en: 'Several times a day',
      fi: 'useita kertoja päivässä',
      se: 'flera gånger om dagen',
    },
    index: 311,
    co2e: 81,
    multiplier: 23.5,
    tips: [
      68651,
      68653,
      68655,
      68659,
      68661,
      68663,
      68665,
      68667,
      68669,
      68671,
    ],
  },
];

const q20as = [
  {
    title: {
      en: 'Never',
      fi: 'en lainkaan',
      se: 'inte alls',
    },
    index: 312,
    co2e: -139,
    multiplier: 0,
    tips: null,
  },
  {
    title: {
      en: '1 - 3 times a week',
      fi: '1 - 3 kertaa viikossa',
      se: '1-3 gånger i veckan',
    },
    index: 313,
    co2e: -118,
    multiplier: 2.6,
    tips: [68651, 68653, 68659, 68665, 68667, 68669, 68671, 68676, 68679],
  },
  {
    title: {
      en: '4 - 7 times a week',
      fi: '4 - 7 kertaa viikossa',
      se: '4-7  gånger i veckan',
    },
    index: 314,
    co2e: -92,
    multiplier: 5.9,
    tips: [68651, 68653, 68659, 68665, 68667, 68669, 68671, 68676, 68679],
  },
  {
    title: {
      en: 'Several times a day',
      fi: 'useita kertoja päivässä',
      se: 'flera gånger om dagen',
    },
    index: 315,
    co2e: 44,
    multiplier: 23.8,
    tips: [68651, 68653, 68659, 68665, 68667, 68669, 68671, 68676, 68679],
  },
];

const q21as = [
  {
    title: {
      en: 'None',
      fi: 'en yhtään',
      se: 'inte alls',
    },
    index: 316,
    co2e: 0,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: '1 portion every now and then',
      fi: '1 annos silloin tällöin',
      se: '1 portion nu som då',
    },
    index: 317,
    co2e: 88,
    multiplier: null,
    tips: [68649],
  },
  {
    title: {
      en: 'Fewer than 3 portions a day',
      fi: 'alle 3 annosta päivässä',
      se: 'mindre än 3 portioner om dagen',
    },
    index: 318,
    co2e: 263,
    multiplier: null,
    tips: [68649],
  },
  {
    title: {
      en: '3 - 5 portions a day',
      fi: '3 - 5 annosta päivässä',
      se: '3-5 portioner om dagen',
    },
    index: 319,
    co2e: 460,
    multiplier: null,
    tips: [68649],
  },
  {
    title: {
      en: 'More than 5 portions a day',
      fi: 'yli 5 annosta päivässä',
      se: 'fler än 5 portioner om dagen',
    },
    index: 320,
    co2e: 635,
    multiplier: null,
    tips: [68649],
  },
];

const q22as = [
  {
    title: {
      en: 'None',
      fi: 'en yhtäkään',
      se: 'inga alls',
    },
    index: 321,
    co2e: 0,
    multiplier: null,
    tips: [68671],
  },
  {
    title: {
      en: '1 - 2 meals per week',
      fi: '1 - 2 ateriaa viikossa',
      se: '1-2 måltider i veckan',
    },
    index: 322,
    co2e: 44,
    multiplier: null,
    tips: [68665, 68671, 68686, 68692, 68710],
  },
  {
    title: {
      en: '3 - 5 meals per week',
      fi: '3 - 5 ateriaa viikossa',
      se: '3-5 måltider i veckan',
    },
    index: 323,
    co2e: 117,
    multiplier: null,
    tips: [68665, 68671, 68686, 68692, 68710],
  },
  {
    title: {
      en: 'More than 5 meals per week',
      fi: 'yli 5 ateriaa viikossa',
      se: 'fler än 5 måltider i veckan',
    },
    index: 324,
    co2e: 175,
    multiplier: null,
    tips: [68665, 68671, 68686, 68692, 68710],
  },
];

const q23as = [
  {
    title: {
      en: 'Never',
      fi: 'en koskaan',
      se: 'aldrig',
    },
    index: 325,
    co2e: 0,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: 'Seldom',
      fi: 'harvoin',
      se: 'sällan',
    },
    index: 326,
    co2e: 4,
    multiplier: null,
    tips: [68541, 68665],
  },
  {
    title: {
      en: 'Every week',
      fi: 'viikoittain',
      se: 'varje vecka',
    },
    index: 327,
    co2e: 16,
    multiplier: null,
    tips: [68541, 68665, 68696],
  },
  {
    title: {
      en: 'Every day',
      fi: 'päivittäin',
      se: 'varje dag',
    },
    index: 328,
    co2e: 57,
    multiplier: null,
    tips: [68541, 68665, 68696],
  },
];

/**
 * Question 17-23
 */

const cat3qs = [
  {
    index: 17,
    title: {
      en: 'How much do you eat compared with the other people at a meal?',
      fi: 'Syötkö mielestäsi paljon vai vähän verrattuna kanssasi aterioiviin?',
      se:
        'Tycker du att du äter mycket eller lite jämfört med de andra som äter tillsammans med dig?',
    },
    answers: q17as,
  },
  {
    index: 18,
    title: {
      en:
        'How often do you have beef, cold cuts or hard cheese as part of your meal?',
      fi:
        'Kuinka usein yhteensä nautit aterioillasi nautaa, leikkeleitä tai kovaa juustoa?',
      se:
        'Hur ofta äter du nötkött, charkuterier eller hårdost under måltiderna?',
    },
    answers: q18as,
  },
  {
    index: 19,
    title: {
      en:
        'How often do you have pork, chicken, fish, eggs or soft cheese as part of your meal?',
      fi:
        'Kuinka usein yhteensä nautit aterioillasi possua, kanaa, kalaa, kananmunaa tai rae-, tuore- tai pehmeitä juustoja?',
      se:
        'Hur ofta äter du svinkött, kyckling, fisk, ägg eller mjukost under måltiderna?',
    },
    answers: q19as,
  },
  {
    index: 20,
    title: {
      en:
        'How often do you have milk products (milk, sour milk, yoghurt, quark, cream, butter) as part of your meal?',
      fi:
        'Kuinka usein nautit aterioillasi maitotuotteita (maito, piimä, jogurtti, rahka, kerma, voi)?',
      se:
        'Hur ofta äter du mjölkprodukter (mjölk, surmjölk, yoghurt, kvarg, grädde, smör) under måltiderna?',
    },
    answers: q20as,
  },
  {
    index: 21,
    title: {
      en:
        'How many portions (cup/mug/pint/glass) of coffee, tea, juice, beer or wine do you drink every day?',
      fi:
        'Kuinka monta annosta (kuppi/muki/tuoppi/lasi) nautit kahvia, teetä, tuoremehua, olutta tai viiniä päivässä?',
      se:
        'Hur många portioner (koppar/muggar/stop/glas) dricker du kaffe, te, juice, öl eller vin om dagen?',
    },
    answers: q21as,
  },
  {
    index: 22,
    title: {
      en: 'How many meals per week do you eat out or in a canteen at work?',
      fi:
        'Kuinka monta ateriaa viikossa syöt kodin ulkopuolella tai työpaikkaruokalassa?',
      se:
        'Hur många måltider i veckan äter du utanför hemmet eller i personalmatsalen?',
    },
    answers: q22as,
  },
  {
    index: 23,
    title: {
      en: 'How often do you throw food away?',
      fi: 'Kuinka usein heität ruokaa roskiin?',
      se: 'Hur ofta kastar du bort mat?',
    },
    answers: q23as,
  },
];

export default cat3qs;
