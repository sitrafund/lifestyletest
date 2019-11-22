import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressCluster from 'express-cluster';
import { database } from './database';
import { router } from './router';
import { server } from './server';
import { universal } from './universal';

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 3000;

expressCluster(
  () => {
    const app = express();

    app.use(cors());
    app.options('*', cors());
    database();
    server(app);
    router(app);

    if (process.argv[2] === '--universal') {
      universal(app);
    }

    return app.listen(PORT);
  },
  { count: 2 },
);
