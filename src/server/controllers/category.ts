import Category from '../models/category';
import BaseController from './base';

export default class CategoryController extends BaseController {
  model = Category;

  getAllPopulated = (req, res) => {
    this.model
      .find({})
      .populate({
        path: 'questions',
        populate: {
          path: 'answers',
          model: 'Answer',
          populate: {
            path: 'tips',
            model: 'Tip',
          },
        },
      })
      .sort({ index: 1 })
      .then(categories => res.json(categories))
      .catch(err => res.sendStatus(400));
  };

  getAll = (req, res) => {
    this.model
      .find()
      .sort({ index: 1 })
      .populate({
        path: 'questions',
        options: {
          sort: 'index',
        },
        populate: {
          path: 'answers',
          model: 'Answer',
          options: {
            sort: '_id',
          },
        },
      })
      .then(category => res.json(category))
      .catch(err => res.sendStatus(400));
  };

  getOneByName = (req, res) => {
    this.model
      .findOne({ name: req.params.categoryName })
      .populate({
        path: 'questions',
        populate: {
          path: 'answers',
          model: 'Answer',
        },
      })
      .then(category => res.json(category))
      .catch(err => res.sendStatus(400));
  };
}
