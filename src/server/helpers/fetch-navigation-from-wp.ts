import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as request from 'request-promise-native';
import Navigation from '../models/navigation';

dotenv.config({ path: '.env' });

const wpUrl =
  process.env.WP_URL ||
  'https://www.sitra.fi/wp/wp-admin/admin-ajax.php?action=get_navigation_html';

const argument = process.argv[2];

if (argument === 'staging') {
  mongoose.connect(process.env.MONGOHQ_URL_STAGING);
} else if (argument === 'production') {
  mongoose.connect(process.env.MONGOHQ_URL_PRODUCTION);
} else {
  mongoose.connect(process.env.MONGOHQ_URL);
}

mongoose.Promise = Promise;

console.log('Navigation update started');
console.log('Fetching navigation from Sitra.fi');
request(wpUrl)
  .then(body => {
    console.log('Navigation fetched');
    console.log('Updating navigation');
    const _body = JSON.parse(body);
    Navigation.updateOne(
      {},
      { $set: { html: { fi: _body.fi, en: _body.en, se: _body.sv } } },
      { upsert: true },
    )
      .then(stats => {
        if (stats.upserted) {
          console.log('Navigation', stats.upserted[0]._id, 'created!');
        } else if (stats.nModified > 0) {
          console.log('Navigation updated!');
        } else {
          console.log('Navigation already up-to-date!');
        }
        process.exit(0);
      })
      .catch(error => {
        throw error;
      });
  })
  .catch(error => {
    throw error;
  });
