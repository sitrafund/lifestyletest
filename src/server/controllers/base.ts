abstract class BaseController {
  abstract model: any;

  // Get all
  getAll = (req, res) => {
    this.model
      .find()
      .then(docs => res.json(docs))
      .catch(error => res.sendStatus(400));
  };

  // Count all
  count = (req, res) => {
    this.model
      .count()
      .then(count => res.json(count))
      .catch(error => res.sendStatus(400));
  };

  // Insert
  insert = (req, res) => {
    const obj = new this.model(req.body);

    obj
      .save()
      .then(item => res.json(item))
      .catch(error => res.sendStatus(400));
  };

  // Get by id
  get = (req, res) => {
    this.model
      .findOne({ _id: req.params.id })
      .then(obj => res.json(obj))
      .catch(error => res.sendStatus(400));
  };

  // Update by id
  update = (req, res) => {
    this.model
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.sendStatus(200))
      .catch(error => res.sendStatus(400));
  };

  // Delete by id
  delete = (req, res) => {
    this.model
      .findOneAndUpdate({ _id: req.params.id })
      .then(() => res.sendStatus(200))
      .catch(error => res.sendStatus(400));
  };
}

export default BaseController;
