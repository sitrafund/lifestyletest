import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as compression from 'compression';

export function server(app) {
  // use body-parser to parse request body as json
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // use morgan server logging in dev mode
  app.use(morgan('dev'));
  app.use(compression());

  // redirect HTTP to HTTPS redirect in heroku
  app.use(function(req, res, next) {
    next();
    // if (process.env.NODE_ENV == 'production') {
    //   if (req.headers['x-forwarded-proto'] !== 'https') {
    //     res.redirect(302, 'https://' + req.hostname + req.originalUrl);
    //   } else {
    //     next();
    //   }
    // } else {
    //   next();
    // }
  });
}
