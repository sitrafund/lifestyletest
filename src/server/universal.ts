import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, InjectionToken } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import { AppServerModule } from '../client/main.server';

enableProdMode();

const distFolder = join(process.cwd(), 'dist/public');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index';

export function universal(app: express.Express) {
  app.engine('html', (path, options: any, callback) => {
    ngExpressEngine({
      bootstrap: AppServerModule,
      providers: [
        { provide: 'request', useFactory: () => options.req, deps: [] },
      ],
    })(path, options, callback);
  });

  app.set('view engine', 'html');
  app.set('views', distFolder);

  app.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    }),
  );

  app.get('*', (req, res) => {
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.render(indexHtml, {
        req,
        res,
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          {
            provide: 'serverUrl',
            useValue: `${req.protocol}://${req.get('host')}`,
          },
        ],
      });
    } else {
      res.redirect(301, 'https://' + req.headers.host + req.url);
    }
  });
}
