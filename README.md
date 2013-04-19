Real Time Development ([RTD](https://github.com/xolvio/real-time-development-with-meteor/wiki/Real-Time-Development)) with Meteor
=======================================
This is a template project exemplifying [RTD](https://github.com/xolvio/real-time-development-with-meteor/wiki/Real-Time-Development) with Meteor.

What does it do?
----------------
Provides all the stubs you need for Meteor, has examples of doing unit and acceptance tests on the leaderboard app, and every time you save a file:
* All your unit tests will run
* All your end-to-end acceptance tests will run
* You'll get a test-coverage report

Tell me more
------------
We're building a complete deployment pipeline for Meteor apps, and creating a template project to share with the community. We're also [blogging](http://blog.xolv.io) it and so far we have:
* [Unit-testing with Meteor](http://blog.xolv.io/2013/04/unit-testing-with-meteor.html)
* [End-to-end testing with Meteor](http://blog.xolv.io/2013/04/end-to-end-testing-for-web-apps-meteor.html)

How does it work?
-----------------
* Karma is configured with file watchers, Jasmine (can easily be switched to Mocha), console reporter and test coverage
* A set of Template/Collection/Session stubs ensure code can load without Meteor
* The stubs expose attributes, functions and events to [Jasmine](https://github.com/pivotal/jasmine) so that [spies](https://github.com/pivotal/jasmine/wiki/Spies) can mock and assert
* A grunt task downloads and starts selenium-server for [WebdriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs)
* A grunt file watcher monitors the main app and keeps a mirror app in sync, where the destructive acceptance tests run
* The default grunt task runs all of the above together

Instructions
------------
Ensure you have [node](http://nodejs.org/download/) and [Meteor](http://meteor.com).

Now clone this project's git repo and run:
```bash
  npm install -g karma
  npm install -g phantomjs
  npm install -g selenium-webdriver
  npm install -g grunt-cli
  npm install
```

And every time you start development, just run this:
```bash
  grunt
```

and enjoy seeing feedback from unit and acceptance tests, as well as test coverage, every time you save a file.
