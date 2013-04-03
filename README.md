Real Time Development ([RTD](https://github.com/xolvio/real-time-development-with-meteor/wiki/Real-Time-Development)) with Meteor
=======================================

This is a template project exemplifying [RTD](https://github.com/xolvio/real-time-development-with-meteor/wiki/Real-Time-Development) with Meteor.

What you get:

* [Meteor unit testing](http://blog.xolv.io/2013/04/unit-testing-with-meteor.html) with Jasmine, with all the necessary stubbing that isolates units of code
* Compile-time [test coverage reports](http://gotwarlost.github.com/istanbul/public/coverage/lcov-report/index.html) using Istanbul
* File watcher runs all tests and coverage reports as you code (thanks to [Karma](http://karma-runner.github.com/))
* End-to-end acceptance tests with [WebdriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs) + [PhantomJS/GhostDriver](http://phantomjs.org/release-1.8.html) running in the background on a separate synchronized Meteor instance with it's own database!

What being worked on right now:
* Examples of doing proper end-to-end demonstrating complex UI interactions such as drag and drop

What's coming soon after:
* File watcher updates browser windows showing acceptance test/coverage reports
* Combined code coverage report from both unit and acceptance test runs (to give a true indication of test coverage)
* Growl notifications

What planned eventually:
* TeamCity pre-tested (delayed) commit
* Blue/Green release process to AWS
* Multi-node replica set MongoDB on AWS
* Horizontally scaled Meteor servers on AWS

How does it work?
-----------------
* Karma is configured with file watchers, Jasmine (can easily be switched to Mocha), console reporter and test coverage
* Retrofitted unit and acceptance tests around the Meteor leaderboard example app demonstrating 100% test coverage
* Templates stub that expose attributes, functions and events to unit tests
* Model stub that allows [Jasmine spies](https://github.com/pivotal/jasmine/wiki/Spies) to spy and assert
* Meteor stub with hooks into the Meteor.xyz methods 
* Session stub with get/set methods
* Collection stub that allows you to count the number of times a collection has been initialized
* Grunt script that keeps a parallel instance of meteor updates with code changes dedicated to acceptance tests
* A grunt task that runs all of the above together

Instructions
------------
Ensure you have [Meteor](http://meteor.com) installed:
```bash
  curl https://install.meteor.com | /bin/sh
``````

You'll need [node](http://nodejs.org/)

You should also have these installed globally:
```bash
  npm install -g karma
  npm install -g phantomjs
  npm install -g selenium-webdriver
  npm install -g grunt-cli
```

Clone this project's git repo, cd into the /test directory and run:
```bash
  npm install
  grunt
```

Enjoy seeing unit tests, acceptance tests and coverage feedback as well as app updates every time you save a file.
