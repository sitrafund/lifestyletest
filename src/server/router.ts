import * as express from 'express';

import AnswerController from './controllers/answer';
import AverageController from './controllers/average';
import CategoryController from './controllers/category';
import QuestionController from './controllers/question';
import ResultController from './controllers/result';
import ExtendedResultController from './controllers/extended-result';
import ResultCategoryController from './controllers/result-category';
import TipController from './controllers/tip';
import NavigationController from './controllers/navigation';

export function router(app) {
  // tslint:disable-next-line:no-shadowed-variable
  const router = express.Router();

  const answerController = new AnswerController();
  const averageController = new AverageController();
  const categoryController = new CategoryController();
  const questionController = new QuestionController();
  const resultController = new ResultController();
  const extendedResultController = new ExtendedResultController();
  const resultCategoryController = new ResultCategoryController();
  const tipController = new TipController();
  const navigationController = new NavigationController();

  // answers
  router.route('/answers').get(answerController.getAll);
  router.route('/answersPopulated').get(answerController.getAllPopulated);
  router.route('/answer/:id').get(answerController.get);
  router.route('/answer').put(answerController.insert);
  router.route('/answer/:id').post(answerController.update);

  // averages
  router.route('/average').get(averageController.get);
  router.route('/average').post(averageController.post);
  router.route('/average/update').get(averageController.update);
  // router.route('/newaverage').get(averageController.upload)

  // categories
  router.route('/categories').get(categoryController.getAll);
  router.route('/categoriesPopulated').get(categoryController.getAllPopulated);
  router.route('/category/:id').get(categoryController.get);
  router.route('/category/name/:category').get(categoryController.getOneByName);
  router.route('/category').put(categoryController.insert);
  router.route('/category/:id').post(categoryController.update);

  // questions
  router.route('/questions').get(questionController.getAll);
  router.route('/questionsPopulated').get(questionController.getAllPopulated);
  router.route('/question/:id').get(questionController.get);
  router.route('/question').put(questionController.insert);
  router.route('/question/:id').post(questionController.update);

  // results
  router.route('/result').get(resultController.create);
  router.route('/results').get(resultController.getAll);
  router.route('/resultPopulated/:id').get(resultController.getPopulated);
  // router.route('/result/average').get(resultController.getAverage)
  router.route('/result/:id').get(resultController.get);
  router.route('/result').put(resultController.insert);
  router.route('/result/:id').post(resultController.update);
  router.route('/results/count').get(resultController.count);

  // results
  router.route('/extendedResult').get(extendedResultController.create);
  router.route('/extendedResults').get(extendedResultController.getAll);
  router
    .route('/extendedResultPopulated/:id')
    .get(extendedResultController.getPopulated);
  // router.route('/extendedResult/average').get(extendedResultController.getAverage)
  router.route('/extendedResult/:id').get(extendedResultController.get);
  router.route('/extendedResult').put(extendedResultController.insert);
  router.route('/extendedResult/:id').post(extendedResultController.update);
  router.route('/extendedResults/count').get(extendedResultController.count);

  // result categories
  router.route('/resultCategories').get(resultCategoryController.getSorted);

  // tips
  router.route('/tips').get(tipController.getAll);
  router.route('/tip/:id').get(tipController.get);
  router.route('/tip').put(tipController.insert);
  router.route('/tip/:id').post(tipController.update);

  // navigation
  router.route('/navigation').get(navigationController.getAll);

  app.use('/api', router);
}
