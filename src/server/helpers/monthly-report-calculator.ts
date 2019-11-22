const mongoose = require('mongoose');
const async = require('async');
const dotenv = require('dotenv');
const chalk = require('chalk');
const fs = require('fs');

dotenv.config({ path: '.env' });

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOHQ_URL);

import ExtendedResult from '../models/extended-result';

let i = 0;
const fileName = 'results/monthly-report-' + new Date().toISOString() + '.json';
const total = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};
const december = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};
const january = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};
const february = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};
const march = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};
const april = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};
const may = {
  count: 0,
  done: 0,
  undone: 0,
  co2e: 0,
  categories: {
    '59ca3e143efc2117ed6a047a': 0,
    '59ca3e143efc2117ed6a04a0': 0,
    '59ca3e143efc2117ed6a04bf': 0,
    '59ca3e143efc2117ed6a04e3': 0,
  },
};

ExtendedResult.count({}).then(count => {
  ExtendedResult.find({})
    .cursor()
    .on('data', function(doc) {
      if (doc.answers[0]) {
        if (doc.answers[0].date.getMonth() === 11) {
          calculate(doc, december);
        } else if (doc.answers[0].date.getMonth() === 0) {
          calculate(doc, january);
        } else if (doc.answers[0].date.getMonth() === 1) {
          calculate(doc, february);
        } else if (doc.answers[0].date.getMonth() === 2) {
          calculate(doc, march);
        } else if (doc.answers[0].date.getMonth() === 3) {
          calculate(doc, april);
        } else if (doc.answers[0].date.getMonth() === 4) {
          calculate(doc, may);
        }
      }
      i++;
      console.log(i + '/' + count);
    })
    .on('end', function() {
      fs.writeFileSync(
        fileName,
        '//TOTAL:\n' +
          JSON.stringify(total) +
          ',\n//december:\n' +
          JSON.stringify(december) +
          ',\n//january:\n' +
          JSON.stringify(january) +
          ',\n//february:\n' +
          JSON.stringify(february) +
          ',\n//march:\n' +
          JSON.stringify(march) +
          ',\n//april:\n' +
          JSON.stringify(april) +
          ',\n//may:\n' +
          JSON.stringify(may),
      );
      console.log('Done!');
      process.exit(0);
    });
});

const calculate = (doc, month) => {
  month.count++;
  total.count++;
  if (doc.answers.length === 27) {
    month.done++;
    month.co2e += doc.co2e;
    month.categories[doc.categoryCO2e[0].category] += doc.categoryCO2e[0].co2e;
    month.categories[doc.categoryCO2e[1].category] += doc.categoryCO2e[1].co2e;
    month.categories[doc.categoryCO2e[2].category] += doc.categoryCO2e[2].co2e;
    month.categories[doc.categoryCO2e[3].category] += doc.categoryCO2e[3].co2e;

    total.done++;
    total.co2e += doc.co2e;
    total.categories[doc.categoryCO2e[0].category] += doc.categoryCO2e[0].co2e;
    total.categories[doc.categoryCO2e[1].category] += doc.categoryCO2e[1].co2e;
    total.categories[doc.categoryCO2e[2].category] += doc.categoryCO2e[2].co2e;
    total.categories[doc.categoryCO2e[3].category] += doc.categoryCO2e[3].co2e;
  } else {
    month.undone++;
    total.undone++;
  }
};
