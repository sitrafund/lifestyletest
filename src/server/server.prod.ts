import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressCluster from 'express-cluster';
import * as morgan from 'morgan';
import { database } from './database';
import { router } from './router';
import { universal } from './universal';

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3000;

expressCluster(
  () => {
    const app = express();

    app.use(cors());
    app.options('*', cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(compression());

    database();
    router(app);
    universal(app);

    return app.listen(PORT);
  },
  { count: 2 },
);
