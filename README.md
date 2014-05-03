Meteor Leaderboard Example using RTD
====================================
This is a project exemplifying xolv.io's RTD Test Runner for Meteor, an end-to-end testing solution combining Karma, Selenium Webdriver and Istanbul. [Click here for the RTD project page.](http://xolvio.github.io/rtd/)

[![RTD DEMO](http://img.youtube.com/vi/ESVRDEY-QSk/0.jpg)](http://www.youtube.com/watch?v=ESVRDEY-QSk)

Instructions
------------
Ensure you have [node](http://nodejs.org/download/) and [Meteor](http://meteor.com).

Now clone this project's git repo and run:
```bash
  git clone https://github.com/xolvio/meteor-rtd-example-project
  cd meteor-rtd-example-project
  npm install
  ./node_modules/.bin/rtd --debug
```

Every time you start development, just run this:
```bash
  ./node_modules/.bin/rtd
```

Or to run on a CI server:
```bash
  ./node_modules/.bin/rtd runOnce
```

Have a play around, and enjoy seeing realtime feedback from unit and acceptance tests, as well as test coverage every time you save a file. If you'd like to use RTD in your Meteor project, head over to [the RTD project page.](http://xolvio.github.io/rtd/)
