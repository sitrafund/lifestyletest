import Average from '../models/average';
import BaseController from './base';
import * as async from 'async';

export default class AverageController extends BaseController {
  model = Average;

  get = (req, res) => {
    this.model
      .findOne()
      .then(average => {
        res.send(average);
      })
      .catch(err => res.sendStatus(400));
  };

  post = (req, res) => {
    this.model
      .findOne()
      .then(average => {
        let totalCo2e = 0;

        let newResults = req.body.categoryCO2e.map(cat => {
          return {
            index: cat.category.index,
            co2e: cat.co2e,
          };
        });

        let newCategories = (_average, _newResults) => {
          let categories = [];
          _average.categories.map(category => {
            _newResults.map(_result => {
              if (_result.index === category.index) {
                category.count++;
                category.co2e += _result.co2e;
                totalCo2e += category.co2e;
                category.average = category.co2e / category.count;
                categories.push(category);
              }
            });
          });
          return categories;
        };

        let newAverageObject = {
          count: average.count + 1,
          categories: newCategories(average, newResults),
          average: totalCo2e / (average.count + 1),
        };

        Average.findOneAndUpdate({}, newAverageObject)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(err => res.sendStatus(400));
      })
      .catch(err => res.sendStatus(400));
  };

  update = (req, res) => {
    let docs;
    async.waterfall(
      [
        cb => {
          this.model.findOne().then(doc => {
            docs = doc;
            cb();
          });
        },
        cb => {
          async.each(
            docs.categories,
            (cat, next) => {
              if (cat.name.fi === 'Asuminen') {
                cat.name.se = 'Boende';
              } else if (cat.name.fi === 'Liikenne ja matkailu') {
                cat.name.se = 'Trafik och resor';
              } else if (cat.name.fi === 'Ruoka') {
                cat.name.se = 'Mat';
              } else if (cat.name.fi === 'Tavarat ja hankinnat') {
                cat.name.se = 'Varor och inköp';
              }
              next();
            },
            error => {
              if (error) {
                console.error(error);
              } else {
                cb();
              }
            },
          );
        },
        cb => {
          this.model.remove().then(() => cb());
        },
      ],
      error => {
        if (error) {
          console.error(error);
        } else {
          this.model.remove({}).then(() => {
            let newAverage = new Average({
              categories: docs.categories,
              average: docs.average,
              count: docs.count,
            });
            newAverage
              .save()
              .then(newAverage => {
                res.sendStatus(200);
              })
              .catch(error => res.sendStatus(400));
          });
        }
      },
    );
  };

  upload = (req, res) => {
    let average = new Average({
      average: 7635,
      count: 3381,
      categories: [
        {
          name: {
            fi: 'Asuminen',
            en: 'Living',
          },
          icon: 'test-icon-asuminen.svg',
          color: 'orange',
          co2e: 8839699,
          count: 3381,
          index: 1,
          average: 2614,
        },
        {
          name: {
            fi: 'Liikenne ja matkailu',
            en: 'Transport and tourism',
          },
          icon: 'test-icon-liikenne-ja-matkailu.svg',
          color: 'blue',
          co2e: 9548970,
          count: 3381,
          index: 2,
          average: 2824,
        },
        {
          name: {
            fi: 'Ruoka',
            en: 'Food',
          },
          icon: 'test-icon-ruoka.svg',
          color: 'green',
          co2e: 5030343,
          count: 3381,
          index: 3,
          average: 1487,
        },
        {
          name: {
            fi: 'Tavarat ja hankinnat',
            en: 'Things and purchases',
          },
          icon: 'test-icon-tuotteet-ja-palvelut.svg',
          color: 'yellow',
          co2e: 2397228,
          count: 3381,
          index: 4,
          average: 709,
        },
      ],
    });
    Average.remove({}).then(() => {
      average.save().then(() => res.sendStatus(200));
    });
  };
}
