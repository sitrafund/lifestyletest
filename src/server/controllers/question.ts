import Question from '../models/question';
import BaseController from './base';

export default class QuestionController extends BaseController {
  model = Question;

  getAllPopulated = (req, res) => {
    this.model
      .find({})
      .populate({
        path: 'answers',
        populate: {
          path: 'tips',
          model: 'Tip',
        },
      })
      .then(questions => res.json(questions))
      .catch(err => res.sendStatus(400));
  };
}
