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

        const newResults = req.body.categoryCO2e.map(cat => {
          return {
            index: cat.category.index,
            co2e: cat.co2e,
          };
        });

        function newCategories(_average, _newResults) {
          const categories = [];
          _average.categories.map(category => {
            const _res = _newResults.find(
              _result => _result.index === category.index,
            );
            category.count++;
            category.co2e += _res.co2e;
            totalCo2e += category.co2e;
            category.average = category.co2e / category.count;
            categories.push(category);
          });
          return categories;
        }

        const newAverageObject = {
          count: average.count + 1,
          categories: newCategories(average, newResults),
          average: totalCo2e / (average.count + 1),
        };

        Average.findOneAndUpdate({}, newAverageObject)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(400);
          });
      })
      .catch(() => {
        res.sendStatus(400);
      });
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
            const newAverage = new Average({
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
    const average = new Average({
      average: 57498.37045619072,
      count: 957351,
      categories: [
        {
          average: 2316.7174703099886,
          index: 1,
          count: 957354,
          co2e: 2217918737.071149,
          color: 'orange',
          icon: 'test-icon-asuminen.svg',
          name: {
            en: 'Living',
            fi: 'Asuminen',
          },
        },
        {
          average: 2512.652859902677,
          index: 2,
          count: 957354,
          co2e: 2405498266.0392675,
          color: 'blue',
          icon: 'test-icon-liikenne-ja-matkailu.svg',
          name: {
            en: 'Transport and tourism',
            fi: 'Liikenne ja matkailu',
          },
        },
        {
          average: 1566.3820873808002,
          index: 3,
          count: 957354,
          co2e: 1499582156.8823586,
          color: 'green',
          icon: 'test-icon-ruoka.svg',
          name: {
            en: 'Food',
            fi: 'Ruoka',
          },
        },
        {
          average: 791.5213670521157,
          index: 4,
          count: 957354,
          co2e: 757766146.8328111,
          color: 'yellow',
          icon: 'test-icon-tuotteet-ja-palvelut.svg',
          name: {
            en: 'Things and purchases',
            fi: 'Tavarat ja hankinnat',
          },
        },
      ],
    });
    Average.remove({}).then(() => {
      average.save().then(() => res.sendStatus(200));
    });
  };
}
