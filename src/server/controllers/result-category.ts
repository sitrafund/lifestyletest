import ResultCategory from '../models/result-category';
import BaseController from './base';

export default class ResultCategoryController extends BaseController {
  model = ResultCategory;

  // Get all sorted
  getSorted = (req, res) => {
    this.model
      .find()
      .sort({ index: 1 })
      .then(docs => res.json(docs))
      .catch(error => res.sendStatus(400));
  };
}
