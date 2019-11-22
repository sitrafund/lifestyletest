const mongoose = require('mongoose');
const dotenv = require('dotenv');

import Result from '../models/result';
import Answer from '../models/answer';
import Category from '../models/category';
import Tip from '../models/tip';

dotenv.config({ path: '.env' });

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOHQ_URL);

Category;
Answer;
Tip;

let countTimer = () => {
  let time = new Date().getTime();
  Result.count({}).then(count => {
    console.log('Count', new Date().getTime() - time);
  });
};

let populateOneTimer = () => {
  let time = new Date().getTime();
  Result.findOne({})
    .populate([
      {
        path: 'categoryCO2e.category',
        model: 'Category',
      },
      {
        path: 'answers.answer',
        model: 'Answer',
        populate: {
          path: 'tips',
          model: 'Tip',
        },
      },
    ])
    .then(result => {
      console.log('Find one', new Date().getTime() - time);
    })
    .catch(err => console.error(err));
};

countTimer();
populateOneTimer();
