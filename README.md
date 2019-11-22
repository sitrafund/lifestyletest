# Sitra Elamantapatesti

## License

Sitra’s 100 Smart Ways and Lifestyle Test: licences and terms of use
100 smart daily activities, a project of Sitra’s Resource-wise citizen focus area (hereinafter referred to as ”100 Smart Ways”) is a website (https://www.sitra.fi/100-smart-ways-to-live-sustainably/ / https://www.sitra.fi/en/projects/100-smart-ways-to-live-sustainably/), which visitors can use to explore 100 concrete measures for achieving more sustainable daily living. Anyone can use the tips to reduce their carbon footprint while at the same time saving money and time or improving their health.

To facilitate wider use, the images, texts and technical implementation – i.e. the code of the Lifestyle Tests – as well as the images and texts of 100 Smart Ways are provided as described in these Terms of Use, collectively or separately, for general use for those interested in these Materials.

The calculations behind the Lifestyle Test can also be made available upon a separate request to Sitra. This makes it easier to follow for which purposes the calculations are applied and to provide instructions for use. The questions and calculations of the Lifestyle Test are based on environmental calculations and the most common lifestyles, as a result of which calculations must be examined separately for each country when introducing the Test for international use. The party implementing the Materials is responsible for adapting the questions and calculations of the Materials to the country as it deems fit.

More detailed license information will be found from link below:  
https://www.sitra.fi/en/articles/sitras-100-smart-ways-lifestyle-test-licences-terms-use/

## Development server

Run `npm run dev` for a dev server. The app will automatically open in browser, if not navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

There are more specific commands to run the server, which can be found in `package.json`.

## Database setup

You'll need a working database to run the app.

- Make sure you have a MongoDB process running.
  - If you don't have MongoDB, [install](https://www.mongodb.com/).
- Copy .env.example -> .env, this contains database URLs for local, staging and production environments.
- Run `npm run sync` to initialize/sync database.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive | pipe | service | class | module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

There are more specific commands to build the app, which can be found in `package.json`.

## Deployment

Every commit to the master branch gets automatically deployed to the staging app in Heroku.
Production deployment is made with `Promote to production` button in Heroku pipeline.

## Project structure

```
.
├── e2e
├── dist                # Compiled files
│   ├── public
│   └── server
├── src                 # Source files
│   ├── client
│   |   ├── app         # Angular app files
│   |   ├── assets      # Static assets
│   |   ├── styles      # Global styles
│   |   └── ...
│   └── server
│       ├── controllers # Server app logic
│       ├── helpers     # Helper tools
│       ├── models      # Mongoose models
│       └── ...
├── .angular-cli.json   # Angular-CLI configurations
├── proxy.conf.json     # Proxy rules for ng serve
└── ...
```

## Running unit tests

> Tests not implemented

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

> Tests not implemented

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Monthly reports

Run `npm run reports` and gather all the data from `results` folder.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
