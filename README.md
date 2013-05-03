Example of Real Time Development ([RTD](https://github.com/xolvio/real-time-development-with-meteor/wiki/Real-Time-Development)) with Meteor
================================================
This is a template project exemplifying the xolv.io [RTD](https://github.com/xolvio/rtd) library with Meteor, using the leaderboard example.

What does RTD do?
-----------------
Provides stubs you need for Meteor to do:
* All your unit tests will run (using Jasmine, can easily be swapped for Mocha)
* All your end-to-end acceptance tests will run (using Selenium WebdriverJS)
* You'll get a test-coverage report

...every time you save a file!

Tell me more
------------
We're building a complete deployment pipeline for Meteor apps, and creating a template project to share with the community. We're also [blogging](http://blog.xolv.io) it and so far we have:
* [Unit-testing with Meteor](http://blog.xolv.io/2013/04/unit-testing-with-meteor.html)
* [End-to-end testing with Meteor](http://blog.xolv.io/2013/04/end-to-end-testing-for-web-apps-meteor.html)

Instructions
------------
Ensure you have [node](http://nodejs.org/download/) and [Meteor](http://meteor.com).

Download the latest [chromeDriver](http://code.google.com/p/chromedriver/downloads/list) and move it into a directory in your PATH. To view your PATH, on Linux/Mac run ```echo $PATH``` For Windows run ```echo %PATH%```

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

Have a play around, and enjoy seeing realtime feedback from unit and acceptance tests, as well as test coverage every time you save a file. If you'd like to use RTD in your Meteor project, head over to our [RTD library repo](https://github.com/xolvio/rtd).

Find out more
-------------
* [What is RTD](https://github.com/xolvio/real-time-development-with-meteor/wiki/Real-Time-Development)
* [What is ATDD](http://mydailyvowels.com/atdd-tdd-agile) ([more](http://www.qualitestgroup.com/Acceptance-Test-Driven-Development))
* [How RTD for Meteor works](https://github.com/xolvio/rtd)
* [Unit-testing with Meteor](http://blog.xolv.io/2013/04/unit-testing-with-meteor.html)
* [End-to-end testing with Meteor](http://blog.xolv.io/2013/04/end-to-end-testing-for-web-apps-meteor.html)
* [Use RTD in your Meteor app](https://github.com/xolvio/rtd)
* [See an example of RTD with Meteor + Leaderboard sample app](https://github.com/xolvio/rtd-meteor-example)
* [Get started by forking a boilerplate project with AWS deployment support](https://github.com/xolvio/rtd-meteor-boilerplate)