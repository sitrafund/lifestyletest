import { enableProdMode, InjectionToken } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import 'reflect-metadata';
import 'zone.js/dist/zone-node';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

enableProdMode();

const DIST_FOLDER = path.join(process.cwd(), 'dist');

export function universal(app) {
  const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP,
  } = require('../../dist/server/main');

  app.engine('html', (_, options, callback) => {
    ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
        { provide: 'request', useFactory: () => options.req, deps: [] },
      ],
    })(_, options, callback);
  });

  app.set('view engine', 'html');
  app.set('views', path.join(DIST_FOLDER, 'public'));

  app.get('*.*', express.static(path.join(DIST_FOLDER, 'public')));

  app.get('*', (req, res) => {
    res.render(path.join(DIST_FOLDER, 'public', 'index.html'), {
      req,
      res,
      providers: [
        {
          provide: 'serverUrl',
          useValue: `${req.protocol}://${req.get('host')}`,
        },
      ],
    });
  });
}
