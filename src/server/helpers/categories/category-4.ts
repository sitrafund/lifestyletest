/**
 * Answers for questions 24-27
 */

const q24as = [
  {
    title: {
      en: 'I don’t like shopping. I only buy what I need.',
      fi: 'En pidä shoppailusta. Ostan vain tarpeeseen.',
      se: 'Jag gillar inte att shoppa. Jag köper bara det jag behöver.',
    },
    index: 401,
    co2e: 527,
    multiplier: null,
    tips: [68698, 68702, 68710],
  },
  {
    title: {
      en:
        'Oh, I love flea markets! You can find all kinds of nice things there!',
      fi: 'Voih, rakastan kirpputoreja! Niiltä löytyy vaikka mitä ihanaa!',
      se: 'Oh, jag älskar lopptorg! Där hittar jag allt möjligt härligt!',
    },
    index: 402,
    co2e: 527,
    multiplier: null,
    tips: [68700, 68702],
  },
  {
    title: {
      en: 'I make impulse buys every now and then.',
      fi: 'Teen heräteostoksia aina silloin tällöin.',
      se: 'Jag gör impulsköp nu som då.',
    },
    index: 403,
    co2e: 1054,
    multiplier: null,
    tips: [68698, 68700, 68702, 68710, 68752],
  },
  {
    title: {
      en: 'I love shopping! (Although all my cupboards are already full…)',
      fi: 'Rakastan shoppailua! (Vaikka kaappini ovatkin jo aivan täynnä…)',
      se: 'Jag älskar att shoppa! (även om mina skåp redan är proppfulla)',
    },
    index: 404,
    co2e: 1581,
    multiplier: null,
    tips: [68698, 68700, 68702, 68710, 68752],
  },
];

const q25as = [
  {
    title: {
      en: 'No',
      fi: 'Ei',
      se: 'Nej',
    },
    index: 405,
    co2e: 0,
    multiplier: [0, 0],
    tips: null,
  },
  {
    title: {
      en: 'I use it in summer',
      fi: 'Kesäkaudella',
      se: 'Under sommaren',
    },
    index: 406,
    co2e: null,
    multiplier: [421.5, 1150.2],
    tips: [68560, 68637],
  },
  {
    title: {
      en: 'I use it throughout the year',
      fi: 'Ympärivuotisessa käytössä',
      se: 'Året om',
    },
    index: 407,
    co2e: null,
    multiplier: [2248, 2459.7],
    tips: [68637],
  },
];

const q26as = [
  {
    title: {
      en: '1 - 4 people',
      fi: '1 - 4 henkilöä',
      se: '1-4 personer',
    },
    index: 408,
    co2e: null,
    multiplier: 2,
    tips: [68637],
  },
  {
    title: {
      en: '5 - 10 people',
      fi: '5 - 10 henkilöä',
      se: '5-10 personer',
    },
    index: 409,
    co2e: null,
    multiplier: 7,
    tips: null,
  },
  {
    title: {
      en: 'More than 10 people',
      fi: 'yli 10 henkilöä',
      se: 'fler än 10 personer',
    },
    index: 410,
    co2e: null,
    multiplier: 13,
    tips: null,
  },
];

const q27as = [
  {
    title: {
      en: 'I don’t have a pet',
      fi: 'en omista lemmikkiä',
      se: 'jag äger inget husdjur',
    },
    index: 411,
    co2e: 0,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: '50 euros',
      fi: '50 euroa',
      se: '50 euro',
    },
    index: 412,
    co2e: 223,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: '100 euros',
      fi: '100 euroa',
      se: '100 euro',
    },
    index: 413,
    co2e: 446,
    multiplier: null,
    tips: null,
  },
  {
    title: {
      en: '200 euros or more',
      fi: '200 euroa tai enemmän',
      se: '200 euro eller mer',
    },
    index: 414,
    co2e: 892,
    multiplier: null,
    tips: null,
  },
];

/**
 * Questions 24-27
 */

const cat4qs = [
  {
    index: 24,
    title: {
      en: 'How would you describe your shopping habits?',
      fi: 'Miten kuvailisit itseäsi shoppailijana?',
      se: 'Hur skulle du beskriva dig som shoppare?',
    },
    answers: q24as,
  },
  {
    index: 25,
    title: {
      en: 'Do you have a summer cottage?',
      fi: 'Onko sinulla käytössäsi kesämökki?',
      se: 'Har du tillgång till sommarstuga?',
    },
    answers: q25as,
  },
  {
    index: 26,
    title: {
      en: 'How many people use the summer cottage regularly?',
      fi: 'Kuinka monta henkilöä käyttää mökkiä säännöllisesti?',
      se: 'Hur många personer använder stugan regelbundet?',
    },
    answers: q26as,
  },
  {
    index: 27,
    title: {
      en: 'How much money do you spend on pets every month?',
      fi: 'Kuinka paljon kulutat rahaa lemmikeihin kuukaudessa?',
      se: 'Hur mycket pengar går åt till husdjuren varje månad?',
    },
    answers: q27as,
  },
];

export default cat4qs;
