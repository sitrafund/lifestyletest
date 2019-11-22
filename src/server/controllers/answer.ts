import Answer from '../models/answer';
import BaseController from './base';

export default class AnswerController extends BaseController {
  model = Answer;

  getAllPopulated = (req, res) => {
    this.model
      .find({})
      .populate('tips')
      .then(answers => res.json(answers))
      .catch(err => res.sendStatus(400));
  };
}
