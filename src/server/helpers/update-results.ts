const mongoose = require('mongoose');
const async = require('async');
const dotenv = require('dotenv');
const chalk = require('chalk');
const fs = require('fs');

dotenv.config({ path: '.env' });

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOHQ_URL);

const answerSchema = new mongoose.Schema({
  title: { en: String, fi: String },
  index: Number,
  co2e: mongoose.Schema.Types.Mixed,
  multiplier: mongoose.Schema.Types.Mixed,
  tips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tip' }],
});

const Answer = mongoose.model('Answer', answerSchema);

import Result from '../models/result';

let count = 0;
let totalCo2e = 0;
const time = new Date().getTime();

Result.count({ $where: 'this.answers.length == 25' }).then(_count => {
  count = _count;
  console.log(count);
  const cursor = Result.find({ $where: 'this.answers.length == 25' })
    .populate({ path: 'answers.answer', model: 'Answer' })
    .cursor()
    .on('data', doc => {
      calculateCo2e(doc);
    })
    .on('end', () => {
      console.log('Done');
      const timeNow = new Date().getTime();
      console.log(timeNow - time);
      console.log(totalCo2e / count);
      process.exit(0);
    });
});

const calculateCo2e = result => {
  result.co2e = 0;
  const answers = result.answers.sort((a, b) => {
    a = new Date(a.date).getTime();
    b = new Date(b.date).getTime();
    if (a && b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
  });
  let i = 1;
  async.each(
    answers,
    (ans, nextAnswer) => {
      i++;
      saveAnswer(result, ans, i - 1, nextAnswer);
    },
    error => {
      if (error) {
        console.error(error);
      } else {
        console.log('Calculated:', result._id, result.co2e);
        totalCo2e = totalCo2e + result.co2e;
      }
    },
  );
};

const saveAnswer = (result, answer, i, nextAnswer) => {
  if (answer.answer) {
    answer.answer = calculateAnswerCo2e(result, answer.answer, i);
  }

  result.answers.push({
    answer: answer.answer,
    date: answer.date,
  });

  if (answer.answer) {
    result.co2e += answer.answer.co2e;
    nextAnswer();
  } else {
    nextAnswer();
  }
};

const calculateAnswerCo2e = (result, answer, i) => {
  switch (i) {
    case 2: {
      const multiplier = result.answers[0].answer.multiplier;
      answer.multiplier[0] = answer.multiplier[1] / multiplier;
      return answer;
    }
    case 3: {
      const multiplier = result.answers[1].answer.multiplier[0];
      if (answer.index === 113) {
        answer.co2e = multiplier * 6.9 + multiplier * 41.1456;
        answer.multiplier = 0;
      } else {
        answer.co2e = multiplier * 6.9 + 748 + multiplier * 41.1456;
        answer.multiplier = 1;
      }
      return answer;
    }
    case 5: {
      const $I$20 = result.answers[1].answer.multiplier[0];
      const $I$12 = result.answers[0].answer.multiplier;
      const $I$25 = result.answers[2].answer.multiplier;
      const $I$26 = result.answers[2].answer.co2e;

      let building;
      let heating;

      if (answer.index === 118) {
        if (result.answers[3].answer.index === 115) {
          // Before 1990 and Block of flats
          building =
            $I$20 * 8.0 + ((1400 + ($I$12 - 1) * 500) / $I$12) * 0.374 * $I$25;
          heating = 0.267 * 240 * $I$20;
        } else if (result.answers[3].answer.index === 116) {
          // Before 1990 and Single-family house
          building =
            $I$20 * 6.9 + ((4600 + ($I$12 - 1) * 900) / $I$12) * 0.374 * $I$25;
          heating = 240 * $I$20 * 0.17144;
        } else if (result.answers[3].answer.index === 117) {
          // Before 1990 and Terraced house
          building =
            $I$20 * 6.9 + ((2600 + ($I$12 - 1) * 700) / $I$12) * 0.374 * $I$25;
          heating = 240 * $I$20 * 0.2785;
        }
      } else if (answer.index === 119) {
        if (result.answers[3].answer.index === 115) {
          // 1990 - 2010 and Block of flats
          building =
            $I$20 * 8.0 + ((1400 + ($I$12 - 1) * 500) / $I$12) * 0.374 * $I$25;
          heating = 0.267 * 160 * $I$20;
        } else if (result.answers[3].answer.index === 116) {
          // 1990 - 2010 and Single-family house or semi-detached house
          building =
            $I$20 * 6.9 + ((4600 + ($I$12 - 1) * 900) / $I$12) * 0.374 * $I$25;
          heating = 160 * $I$20 * 0.17144;
        } else if (result.answers[3].answer.index === 117) {
          // 1990 - 2010 and Terraced house
          building =
            $I$20 * 6.9 + ((2600 + ($I$12 - 1) * 700) / $I$12) * 0.374 * $I$25;
          heating = 160 * $I$20 * 0.2785;
        }
      } else if (answer.index === 120) {
        if (result.answers[3].answer.index === 115) {
          // After 2010 and Block of flats
          building =
            $I$20 * 8.0 + ((1400 + ($I$12 - 1) * 500) / $I$12) * 0.374 * $I$25;
          heating = 0.267 * 130 * $I$20;
        } else if (result.answers[3].answer.index === 116) {
          // After 2010 and Single-family house or semi-detached house
          building =
            $I$20 * 6.9 + ((4600 + ($I$12 - 1) * 900) / $I$12) * 0.374 * $I$25;
          heating = 130 * $I$20 * 0.17144;
        } else if (result.answers[3].answer.index === 117) {
          // After 2010 and Terraced house
          building =
            $I$20 * 6.9 + ((2600 + ($I$12 - 1) * 700) / $I$12) * 0.374 * $I$25;
          heating = 130 * $I$20 * 0.2785;
        }
      }
      answer.co2e = building + heating - $I$26;
      answer.multiplier = heating;
      return answer;
    }
    case 6: {
      if (answer.index === 121) {
        answer.co2e = 0;
      } else if (answer.index === 122) {
        answer.co2e = result.answers[4].answer.multiplier * 0.1;
      } else if (answer.index === 123) {
        answer.co2e = result.answers[4].answer.multiplier * 0.25;
      }
      return answer;
    }
    case 7: {
      if (answer.index === 124) {
        answer.co2e = result.answers[4].answer.multiplier * -0.1;
      } else if (answer.index === 125) {
        answer.co2e = 0;
      } else if (answer.index === 126) {
        answer.co2e = result.answers[4].answer.multiplier * 0.1;
      }
      return answer;
    }
    case 10: {
      answer.co2e = result.answers[8].answer.multiplier / answer.multiplier;
      return answer;
    }
    case 13: {
      if (answer.index === 219) {
        answer.co2e = result.answers[11].answer.multiplier / 2;
      } else if (answer.index === 220) {
        answer.co2e = result.answers[11].answer.multiplier / 1;
      }
      return answer;
    }
    case 23: {
      answer.multiplier =
        result.answers[2].answer.multiplier * answer.multiplier[0] +
        answer.multiplier[1];
      return answer;
    }
    case 24: {
      answer.co2e = result.answers[22].answer.multiplier / answer.multiplier;
      return answer;
    }
    default: {
      return answer;
    }
  }
};
