const mongoose = require('mongoose');
const async = require('async');
const dotenv = require('dotenv');
const chalk = require('chalk');
const fs = require('fs');

dotenv.config({ path: '.env' });

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOHQ_URL);

import ExtendedResult from '../models/extended-result';
import ResultCategory from '../models/result-category';

const classis = [];
const fileName =
  'results/result-category-' + new Date().toISOString() + '.json';
let i = 0;
let count = 0;

const Categories = [
  {
    id: '59ca3e143efc2117ed6a047a',
    co2e: 0,
    count: 0,
    total: 0,
    december: 0,
    decemberC02e: 0,
    january: 0,
    januaryC02e: 0,
    february: 0,
    februaryC02e: 0,
    march: 0,
    marchC02e: 0,
    april: 0,
    aprilC02e: 0,
    may: 0,
    mayC02e: 0,
  },
  {
    id: '59ca3e143efc2117ed6a04a0',
    co2e: 0,
    count: 0,
    total: 0,
    december: 0,
    decemberC02e: 0,
    january: 0,
    januaryC02e: 0,
    february: 0,
    februaryC02e: 0,
    march: 0,
    marchC02e: 0,
    april: 0,
    aprilC02e: 0,
    may: 0,
    mayC02e: 0,
  },
  {
    id: '59ca3e143efc2117ed6a04bf',
    co2e: 0,
    count: 0,
    total: 0,
    december: 0,
    decemberC02e: 0,
    january: 0,
    januaryC02e: 0,
    february: 0,
    februaryC02e: 0,
    march: 0,
    marchC02e: 0,
    april: 0,
    aprilC02e: 0,
    may: 0,
    mayC02e: 0,
  },
  {
    id: '59ca3e143efc2117ed6a04e3',
    co2e: 0,
    count: 0,
    total: 0,
    december: 0,
    decemberC02e: 0,
    january: 0,
    januaryC02e: 0,
    february: 0,
    februaryC02e: 0,
    march: 0,
    marchC02e: 0,
    april: 0,
    aprilC02e: 0,
    may: 0,
    mayC02e: 0,
  },
  {
    id: '5a2a940fa03df12faddd7215',
    co2e: 0,
    count: 0,
    total: 0,
    december: 0,
    decemberC02e: 0,
    january: 0,
    januaryC02e: 0,
    february: 0,
    februaryC02e: 0,
    march: 0,
    marchC02e: 0,
    april: 0,
    aprilC02e: 0,
    may: 0,
    mayC02e: 0,
  },
  {
    id: '5a2a940fa03df12faddd7214',
    co2e: 0,
    count: 0,
    total: 0,
    december: 0,
    decemberC02e: 0,
    january: 0,
    januaryC02e: 0,
    february: 0,
    februaryC02e: 0,
    march: 0,
    marchC02e: 0,
    april: 0,
    aprilC02e: 0,
    may: 0,
    mayC02e: 0,
  },
];

ExtendedResult.count({ $where: 'this.answers.length == 27' }).then(_count => {
  count = _count;
  ExtendedResult.find({ $where: 'this.answers.length == 27' })
    .cursor()
    .on('data', function(doc) {
      // if (doc.answers[0].date.getMonth() === 1) {
      // }
      chooseClassification(doc);
      i++;
      console.log(i + '/' + count);
    })
    .on('end', function() {
      console.log('Done!');
      console.log(classis.length);
      fs.appendFileSync(fileName, JSON.stringify(Categories));
      process.exit(0);
    });
});

const chooseClassification = result => {
  let bestCategory;
  let worstCategory;
  const averageData: Array<any> = [
    {
      index: 1,
      value: 2700,
      icon: '/assets/images/test-icon-asuminen.svg',
      color: 'orange',
    },
    {
      index: 2,
      value: 2000,
      icon: '/assets/images/test-icon-liikenne-ja-matkailu.svg',
      color: 'blue',
    },
    {
      index: 3,
      value: 2100,
      icon: '/assets/images/test-icon-ruoka.svg',
      color: 'green',
    },
    {
      index: 4,
      value: 1000,
      icon: '/assets/images/test-icon-tuotteet-ja-palvelut.svg',
      color: 'yellow',
    },
  ];

  const overAverage = [];
  const underAverage = [];
  const sameAsAverage = [];

  result.categoryCO2e.map((category, index) => {
    if (Math.ceil(category.co2e / 100) * 100 > averageData[index].value) {
      overAverage.push({
        category: category.category,
        diff: (Math.ceil(category.co2e / 100) * 100) / averageData[index].value,
      });
    } else if (
      Math.ceil(category.co2e / 100) * 100 <
      averageData[index].value
    ) {
      underAverage.push({
        category: category.category,
        diff: (Math.ceil(category.co2e / 100) * 100) / averageData[index].value,
      });
    } else {
      sameAsAverage.push({
        category: category.category,
        diff: (Math.ceil(category.co2e / 100) * 100) / averageData[index].value,
      });
    }
  }, this);

  if (result.co2e <= 3000 || result.co2e >= 15000) {
    ResultCategory.find()
      .sort({ index: 1 })
      .then(docs => {
        if (result.co2e <= 3000) {
          bestCategory = docs[0];
        } else {
          bestCategory = docs[1];
        }
        if (bestCategory) {
          calculate(bestCategory._id, result);
        }
      });
  } else {
    if (underAverage.length > 0) {
      let smallestDifference = 1;
      let smallestDifferenceCategory;
      underAverage.map(cat => {
        if (cat.diff < smallestDifference) {
          smallestDifferenceCategory = cat;
          smallestDifference = cat.diff;
        }
      });
      if (overAverage.length === 0) {
        let largestDifference = 0;
        let largestDifferenceCategory;
        underAverage.map(cat => {
          if (cat.diff > largestDifference) {
            largestDifferenceCategory = cat;
            largestDifference = cat.diff;
          }
        });
        worstCategory = largestDifferenceCategory.category;
      }
      if (smallestDifferenceCategory) {
        bestCategory = smallestDifferenceCategory.category;
      }
    }

    if (overAverage.length > 0 && overAverage.length < averageData.length) {
      let largestDifference = 0;
      let largestDifferenceCategory;
      overAverage.map(cat => {
        if (cat.diff > largestDifference) {
          largestDifferenceCategory = cat;
          largestDifference = cat.diff;
        }
      });
      worstCategory = largestDifferenceCategory.category;
      if (underAverage.length === 0) {
        let smallestDifferenceCategory;
        overAverage.map(cat => {
          if (cat.diff < largestDifference) {
            smallestDifferenceCategory = cat;
            largestDifference = cat.diff;
          }
        });
        if (smallestDifferenceCategory) {
          bestCategory = smallestDifferenceCategory.category;
        }
      }
    }

    if (underAverage.length === 0 && sameAsAverage.length > 0) {
      bestCategory = sameAsAverage[0].category;
    }
    if (bestCategory) {
      calculate(bestCategory, result);
    }
  }
};

const calculate = (bestCategory, result) => {
  let index;
  const cat = Categories.find((category, x) => {
    if (JSON.stringify(category.id) === JSON.stringify(bestCategory)) {
      index = x;
      return true;
    } else {
      return false;
    }
  });
  if (result.answers[0].date.getMonth() === 11) {
    cat.december++;
    cat.decemberC02e += result.co2e;
  } else if (result.answers[0].date.getMonth() === 0) {
    cat.january++;
    cat.januaryC02e += result.co2e;
  } else if (result.answers[0].date.getMonth() === 1) {
    cat.february++;
    cat.februaryC02e += result.co2e;
  } else if (result.answers[0].date.getMonth() === 2) {
    cat.march++;
    cat.marchC02e += result.co2e;
  } else if (result.answers[0].date.getMonth() === 3) {
    cat.april++;
    cat.aprilC02e += result.co2e;
  } else if (result.answers[0].date.getMonth() === 4) {
    cat.may++;
    cat.mayC02e += result.co2e;
  }
  cat.co2e += result.co2e;
  cat.total++;
  Categories[index] = cat;
};
