const mongoose = require('mongoose');
const async = require('async');
const dotenv = require('dotenv');
const chalk = require('chalk');
const fs = require('fs');

dotenv.config({ path: '.env' });

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOHQ_URL);

import ExtendedResult from '../models/extended-result';
import Answer from '../models/answer';

let Answers = [];
let i = 0;
const fileName = 'results/answer-counts-' + new Date().toISOString() + '.json';

const addAnswer = answer => {
  const index = Answers.findIndex(x => {
    return JSON.stringify(x.id) === JSON.stringify(answer.answer);
  });
  if (index !== -1) {
    if (answer.date.getMonth() === 11) {
      Answers[index].december++;
    } else if (answer.date.getMonth() === 0) {
      Answers[index].january++;
    } else if (answer.date.getMonth() === 1) {
      Answers[index].february++;
    } else if (answer.date.getMonth() === 2) {
      Answers[index].march++;
    } else if (answer.date.getMonth() === 3) {
      Answers[index].april++;
    } else if (answer.date.getMonth() === 4) {
      Answers[index].may++;
    }
    Answers[index].total++;
  }
};
const countResults = ExtendedResult.count({
  $where: 'this.answers.length == 27',
});
const findAnswers = Answer.find({ 'title.fi': { $exists: true } });

findAnswers
  .then(answers => {
    Answers = answers.map(answer => {
      return {
        id: answer._id,
        index: answer.index,
        title: answer.title.fi,
        total: 0,
        december: 0,
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
      };
    });
    Answers.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(JSON.stringify(Answers));
  })
  .then(() => {
    countResults.then(count => {
      ExtendedResult.find(
        { $where: 'this.answers.length == 27' },
        { answers: 1 },
      )
        .cursor()
        .on('data', doc => {
          doc.answers.map(answer => {
            addAnswer(answer);
          });
          console.log(i + '/' + count);
          i++;
        })
        .on('end', () => {
          fs.writeFileSync(fileName, JSON.stringify(Answers));
          console.log('Done');
        });
    });
  });
