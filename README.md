Meteor Leaderboard Example using RTD
====================================
This is a project exemplifying xolv.io's RTD Test Runner for Meteor, an end-to-end testing solution combining Karma, Selenium Webdriver and Istanbul. [Click here for the RTD project page.](http://xolvio.github.io/rtd/)

[![RTD DEMO](http://img.youtube.com/vi/ESVRDEY-QSk/0.jpg)](http://www.youtube.com/watch?v=ESVRDEY-QSk)

Instructions
------------
Ensure you have [node](http://nodejs.org/download/) and [Meteor](http://meteor.com).

Now clone this project's git repo and run:
```bash
  npm i -g karma phantomjs selenium-webdriver grunt-cli jasmine-node istanbul
  git submodule init
  git submodule update
  cd test/rtd
  npm install
```

And every time you start development, just run this:
```bash
  cd test/rtd
  grunt
```

Have a play around, and enjoy seeing realtime feedback from unit and acceptance tests, as well as test coverage every time you save a file. If you'd like to use RTD in your Meteor project, head over to [the RTD project page.](http://xolvio.github.io/rtd/)
