import * as async from 'async';
import * as mongoose from 'mongoose';
import Result from '../models/result';
import Category from '../models/category';
import Question from '../models/question';
import BaseController from './base';

export default class ResultController extends BaseController {
  model = Result;

  getPopulated = (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.sendStatus(400);
    } else {
      this.model
        .findOne({ _id: req.params.id })
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
          res.set({ 'Cache-Control': 'no-cache' });
          res.json(result);
        })
        .catch(err => res.sendStatus(400));
    }
  };

  create = (req, res) => {
    const newResult = new Result();
    newResult
      .save()
      .then(result => {
        res.set({ 'Cache-Control': 'no-cache' });
        res.json(result);
      })
      .catch(err => res.sendStatus(400));
  };

  getAverage = (req, res) => {
    const getQuestionCount = Question.count()
      .then(questionCount => {
        return questionCount;
      })
      .catch(err => res.sendStatus(400));

    const getCategories = Category.find()
      .sort({ index: 1 })
      .then(categories => {
        return categories.map(category => {
          return (category = {
            name: category.title,
            icon: '',
            color: '',
            co2e: 0,
            count: 0,
            index: undefined,
            average: 0,
          });
        });
      })
      .catch(err => res.sendStatus(400));

    Promise.all([getQuestionCount, getCategories]).then(
      ([questionCount, categories]) => {
        let count = 0;
        this.model
          .find({ $where: 'this.answers.length == ' + questionCount })
          .populate([
            {
              path: 'categoryCO2e.category',
              model: 'Category',
            },
          ])
          .then(results => {
            return results.map(result => {
              count++;
              return result.categoryCO2e.map(categoryCo2e => {
                if (categoryCo2e.category) {
                  const i = categoryCo2e.category.index - 1;
                  categories[i].co2e += categoryCo2e.co2e;
                  categories[i].count++;
                  categories[i].icon = categoryCo2e.category.icon;
                  categories[i].color = categoryCo2e.category.color;
                  categories[i].index = categoryCo2e.category.index;
                }
                return true;
              });
            });
          })
          .then(() => {
            let average = 0;
            categories.map(category => {
              category.average = category.co2e / category.count;
              average += category.average;
              return category;
            });
            res.json({
              categories: categories,
              average: average,
              count: count,
            });
          })
          .catch(err => res.sendStatus(400));
      },
    );
  };
}
