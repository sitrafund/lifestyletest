// tslint:disable:max-line-length

import cat1qs from './category-1';
import cat2qs from './category-2';
import cat3qs from './category-3';
import cat4qs from './category-4';

const categories = [
  {
    index: 1,
    title: {
      en: 'Living',
      fi: 'Asuminen',
      se: 'Boende',
    },
    endInfoPositive: {
      en: 'Your use of energy at home is at a moderate level.',
      fi: 'Kotisi ja tapasi kuluttaa energiaa ovat kohtuullisella tasolla.',
      se: 'Ditt hem och dina vanor förbrukar energi och är på rimlig nivå.',
    },
    endInfoNegative: {
      en:
        'You’re quite the energy consumer. Is the energy you use produced in a sustainable way?',
      fi:
        'Olet melkoinen energiankuluttaja. Onko käyttämäsi energia tuotettu kestävästi?',
      se:
        'Du använder rätt mycket energi. Har den energi du använder producerats på ett hållbart sätt?',
    },
    endInfoCommon: {
      en: 'Now, let’s have a look at how you get from one place to another!',
      fi: 'Katsotaan seuraavaksi, mikä sinua liikuttaa!',
      se: 'Näst ska vi ta en titt på hur du rör på dig!',
    },
    averageCo2e: 2700,
    color: 'orange',
    icon: 'test-icon-asuminen.svg',
    questions: cat1qs,
    slug: {
      en: 'home-lover',
      fi: 'pesanrakentaja',
      se: 'bobyggare',
    },
    tags: {
      en: ['living'],
      fi: ['asuminen'],
      se: ['boende'],
    },
    resultInfo: {
      image: 'tulos-pesanrakentaja@3x.png',
      title: {
        en: 'YOU ARE AN ECONOMICAL HOME-LOVER',
        fi: 'OLET SÄÄSTELIÄS PESÄN&shy;RAKENTAJA',
        se: 'DU ÄR EN SPARSAM BOBYGGARE',
      },
      altTitle: {
        en: 'I am an economical home-lover!',
        fi: 'Olen säästeliäs pesänrakentaja!',
        se: 'Jag är en sparsam bobyggare!',
      },
      positiveDescription: {
        en:
          'You are the heart and soul of your home and create balance around you. You know the impact of your lifestyle on the environment, although you may occasionally give in to temptations.',
        fi:
          'Olet kodin henki tai hengetär, joka rakentaa ympärilleen tasapainoa. Tunnet elämäntapasi vaikutukset ympäristöön vaikka saatat joskus sortua houkutuksiin.',
        se:
          'Du är hemmets härskare som skapar balans runt omkring sig. Du känner till hur din livsstil inverkar på miljön även om du ibland kan falla för frestelsen.',
      },
      negativeDescription: {
        en:
          'Your home is your castle and you understand how your home consumes energy. A few easy tips may save you up to hundreds of euros per year.',
        fi:
          'Kotisi on linnasi ja ymmärrät miten kotisi kuluttaa energiaa. Muutamalla helpolla konstilla voit säästää jo satoja euroja vuodessa.',
        se:
          'Ditt hem är din borg och du förstår hur det förbrukar energi. Med några lätta tricks kan du spara hundratals euro i året.',
      },
    },
  },
  {
    index: 2,
    title: {
      en: 'Transport and tourism',
      fi: 'Liikenne ja matkailu',
      se: 'Trafik och resor',
    },
    endInfoPositive: {
      en: 'You use low-carbon transport and are hopefully getting fitter, too!',
      fi: 'Liikut vähäpäästöisesti ja kuntosikin toivottavasti nousee!',
      se:
        'Du använder transportsätt med låga utsläpp och din kondition blir kanske bättre!',
    },
    endInfoNegative: {
      en:
        'You seem to accumulate additional kilometres easily! Have you thought about reducing the emissions or compensating for them through offset payments?',
      fi:
        'Sinulle taitaa kertyä helposti lisäkilometrejä? Oletko miettinyt päästöjen vähentämistä tai hyvittämistä päästömaksuilla?',
      se:
        'Du samlar lätt på dig extrakilometrar? Har du tänkt på att minska utsläppen eller gottgöra dem med utsläppsavgifter?',
    },
    endInfoCommon: {
      en: 'Let’s have a look how you eat!',
      fi: 'Vilkaistaan, millainen ruokailija olet!',
      se: 'Så tar vi en titt på hur du äter!',
    },
    averageCo2e: 2000,
    color: 'blue',
    icon: 'test-icon-liikenne-ja-matkailu.svg',
    questions: cat2qs,
    slug: {
      en: 'eco-traveler',
      fi: 'kanssamatkustaja',
      se: 'medresenär',
    },
    tags: {
      en: ['transport', 'tourism'],
      fi: ['matkailu', 'liikkuminen'],
      se: ['trafik', 'resor'],
    },
    resultInfo: {
      image: 'tulos-kanssamatkustaja@3x.png',
      title: {
        en: 'YOU ARE A RESPONSIBLE ECO-TRAVELER',
        fi: 'OLET VASTUULLINEN KANSSA&shy;MATKUSTAJA',
        se: 'DU ÄR EN ANSVARSKÄNNANDE MEDRESENÄR',
      },
      altTitle: {
        en: 'I am a responsible eco-traveler!',
        fi: 'Olen vastuullinen kanssamatkustaja!',
        se: 'Jag är en ansvarskännande medresenär!',
      },
      positiveDescription: {
        en:
          'You are a real explorer! You know the impacts of travelling and tourism on the environment. Combining trips and sharing transport comes naturally to you.',
        fi:
          'Olet oikea löytöretkeilijä! Tunnet liikkumisen ja matkailun vaikutukset ympäristöön. Matkojen yhdistäminen ja kulkuneuvon jakaminen ovat sinulle luontevia.',
        se:
          'Du är en verklig upptäcktsresande! Du känner till hur din mobilitet och dina resor påverkar miljön. Att kombinera resor och att dela fordon är naturligt för dig.',
      },
      negativeDescription: {
        en:
          'When you travel, you could take advantage of different modes of transport and save money and time. Can you think of ways to reduce sedentary time?',
        fi:
          'Liikkumisessa voisit hyödyntää eri liikennevälineitä ja säästää aikaa ja rahaa. Keksitkö keinoja miten voisit vähentää istumista?',
        se:
          'I mobiliteten kunde du utnyttja olika transportmedel och spara både tid och pengar. Kan du komma på sätt att minska på sittandet?',
      },
    },
  },
  {
    index: 3,
    title: {
      en: 'Food',
      fi: 'Ruoka',
      se: 'Mat',
    },
    endInfoPositive: {
      en: 'Your eating habits look fairly good!',
      fi: 'Ruokailutottumuksesi ovat melko hyvällä mallilla!',
      se: 'Dina matvanor är rätt bra!',
    },
    endInfoNegative: {
      en:
        'Hello there, you! You are a real hedonist and eat whatever you feel like.',
      fi: 'Hei sinä siellä! Olet oikea nautiskelija ja syöt miten huvittaa.',
      se: 'Hej, du där! Du är en riktig gourmand och du äter hur du vill.',
    },
    endInfoCommon: {
      en:
        'To save money or to go shopping, that’s one final thing to have a look at!',
      fi: 'Säästää vai shoppailla, selvitetään se vielä!',
      se: 'Spara eller shoppa, låt oss ta reda på det!',
    },
    averageCo2e: 2100,
    color: 'green',
    icon: 'test-icon-ruoka.svg',
    questions: cat3qs,
    slug: {
      en: 'gourmet-lover',
      fi: 'herkuttelija',
      se: 'gourmand',
    },
    tags: {
      en: ['food'],
      fi: ['ruoka'],
      se: ['mat'],
    },
    resultInfo: {
      image: 'tulos-herkuttelija@3x.png',
      title: {
        en: 'YOU ARE A GREEN GOURMET LOVER',
        fi: 'OLET VIHREÄ HERKUTTELIJA',
        se: 'DU ÄR EN GRÖN GOURMAND',
      },
      altTitle: {
        en: 'I am a green gourmet lover!',
        fi: 'Olen vihreä herkuttelija!',
        se: 'Jag är en grön gourmand',
      },
      positiveDescription: {
        en:
          'You know that the way to the heart and healthier veins is through the stomach. You know the impact of your lifestyle on the environment.',
        fi:
          'Tiedät, että tie sydämeen ja terveempiin verisuoniin käy vatsan kautta. Tunnet elämäntapasi vaikutukset ympäristöön.',
        se:
          'Du vet att vägen till hjärtat och friskare blodkärl går via magen. Du känner till hur din livsstil påverkar miljön.',
      },
      negativeDescription: {
        en:
          'You may rely too much on nutrition derived from animals. You could add more vegetables to your plate, even just for the taste.',
        fi:
          'Saatat luottaa liikaa eläinkunnasta peräisin olevaan ravintoon. Voisit lisätä kasviksia lautaselle jo maun vuoksi.',
        se:
          'Du kan förlita dig lite väl mycket på föda från djurriket och du kunde lägga till grönsaker på tallriken för smakens skull.',
      },
    },
  },
  {
    index: 4,
    title: {
      en: 'Things and purchases',
      fi: 'Tavarat ja hankinnat',
      se: 'Varor och inköp',
    },
    endInfoPositive: {
      en:
        'You manage with less than people do on average. Many people could follow your example!',
      fi:
        'Pärjäät keskivertoa vähemmällä. Moni voisi ottaa sinusta esimerkkiä!',
      se:
        'Du klarar dig med mindre än de flesta. Du kunde vara ett föredöme för många!',
    },
    endInfoNegative: {
      en:
        'You are doing well, good for you! But have you thought about the amount of natural resources you consume?',
      fi:
        'Sinulla menee hyvin, mutta menköön! Entä oletko miettinyt, kuinka paljon kulutat luonnonvaroja?',
      se:
        'Det går bra för dig och låt gå! Men har du funderat över hur mycket naturresurser du förbrukar?',
    },
    endInfoCommon: {
      en: '',
      fi: '',
      se: '',
    },
    averageCo2e: 1200,
    color: 'yellow',
    icon: 'test-icon-tuotteet-ja-palvelut.svg',
    questions: cat4qs,
    slug: {
      en: 'indulger',
      fi: 'hemmottelija',
      se: 'njutare',
    },
    tags: {
      en: ['services'],
      fi: ['palvelut'],
      se: ['tjänster'],
    },
    resultInfo: {
      image: 'tulos-hemmottelija@3x.png',
      title: {
        en: 'YOU ARE A QUALITY-CONSCIOUS INDULGER',
        fi: 'OLET LAATU&shy;TIETOINEN HEMMOTTELIJA',
        se: 'DU ÄR EN KVALITETS&shy;MEDVETEN NJUTARE',
      },
      altTitle: {
        en: 'I am a quality-conscious indulger!',
        fi: 'Olen laatutietoinen hemmottelija!',
        se: 'Jag är en kvalitetsmedveten njutare!',
      },
      positiveDescription: {
        en:
          'You understand the impact your choices have on your lifestyle and the environment.',
        fi: 'Ymmärrät valintojesi vaikutuksen elämäntapaasi ja ympäristölle.',
        se: 'Du förstår hur dina val inverkar på din livsstil och miljön.',
      },
      negativeDescription: {
        en:
          'Can you bear a crack in the idyll? Join the other Finns who recycle, repair and rent.',
        fi:
          'Kestätkö särön idyllissä? Liity muiden suomalaisten joukkoon: kierrätä, korjaa ja vuokraa.',
        se:
          'Tål du en spricka i idyllen? Anslut dig till de andra finländarna: återvinn, reparera och hyr.',
      },
    },
  },
];

export default categories;
