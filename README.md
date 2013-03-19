Realtime TDD with Meteor
========================
This is a template project attempting real-time test driven development with Meteor, along with a full build and
deployment pipeline on Amazon AWS. It's purpose is to allow a team to land on their feet running, or to shortcut
iteration 0 as it's known in the agile community.

It can do:
* Meteor unit testing with Jasmine, with all the necessary stubbing (See below)
* Compile-time code coverage using Istanbul
* File watcher runs all tests and coverage reports (thanks to [Karma](http://karma-runner.github.com/))

It's currently undergoing surgery to get:
* End-to-end acceptance testing with WebdriverJS + PhantomJS/GhostDriver

It's next going to get:
* File watcher updates browser windows showing acceptance test/coverage reports
* Combined code coverage report from both unit and acceptance test runs (to give a true indication of test coverage)

It's eventually planned to get:
* TeamCity pre-tested (delayed) commit
* Blue/Green release process to AWS
* Multi-node replica set MongoDB on AWS
* Horizontally scaled Meteor servers on AWS

What's included?
----------------
* Karma with file watchers, Jasmine (can easily be switched to Mocha), console reporter and coverage configured
* Retrofitted unit and acceptance tests around the Meteor leaderboard example app demonstrating 100% test coverage
* Templates stub that expose functions and events to unit tests
* Model stub that allows [Jasmine spies](https://github.com/pivotal/jasmine/wiki/Spies) to be used
* Meteor stub with hooks into the Meteor.x methods
* Session stub with get/set methods
* Collection stub that allows you to count the number of times a collection has been initialized

What is Realtime TDD?
---------------------
This is a term I have coined to see if it will catch on :) It's based on the following philosophy, which I live my work
life by:

The ability to capture and deal with feedback it is a great indicator of quality, both of working practises and the end
product. Feedback comes in all shapes and sizes and the earlier it can be captured, the easier and cheaper it is to deal
with. Now consider the ideal scenario of getting feedback in realtime, then consider the trend of using file watchers
and the speed of which test run in a Javascript environment. You could say we're not that far off from this ideal with
all the magic efforts the community has put in.

This project aims to get the product development process as close as possible to that ideal so we can deliver better
quality products and enjoy doing it.

The key feedback areas are:
* Static analysis (linting, test coverage)
* Automated testing (unit & acceptance)
* Monitoring (metrics and logging)
* Performance testing (stress, load, soak)

Instructions
------------
Ensure you have Meteor installed:
```bash
  curl https://install.meteor.com | /bin/sh
```

Optional: Install these libraries globally:
```bash
  npm install -g karma
  npm install -g PhantomJS
  npm install -g selenium-webdriver
```

Clone this project's git repo, cd into the /test directory and run:
```bash
  npm install
```

Start karma to get the realtime testing feedback:
```bash
  karma start
```

Finally start meteor to get realtime app development feedback:
```bash
  meteor
```

Enjoy!

Disclaimer
----------
I'm originally a Java / Grails developer which means you shouldn't expect my Javascript to be amazing. I'd love to hear
feedback and of course pull requests for anything you think could do with improvement.