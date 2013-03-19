Realtime TDD with Meteor
========================
This is a template project attempting a real-time test driven development with Meteor, along with a full build and
deployment pipeline on Amazon AWS. It's purpose is to allow a team to land on their feet running, or to shortcut
iteration 0, as it's known in the agile community.

It can:
* Meteor unit testing with Jasmine
* Compile-time code coverage using Istanbul

It's currently having surgery to get:
* End-to-end acceptance testing with WebdriverJS + PhantomJS/GhostDriver

It's planned to do:
* Run-time code coverage using Istanbul
* TeamCity pre-tested (delayed) commit
* Blue/Green release process to AWS
* Multi-node replica set MongoDB on AWS
* Horizontally scaled Meteor servers on AWS

What's included?
----------------
* Karma with file watchers, console reporter and coverage configured
* Retrofitted unit and acceptance tests around the Meteor leaderboard example app demonstrating 100% test coverage
* Mock methods for Meteor templates to expose functions and events to unit tests
* Session stub with get/set methods
* Meteor stub with hooks into the Meteor.x methods
* Database collection stub that allows you to count the number of times a collection has been instenitated

What is Realtime TDD?
---------------------
This is a term I have coined to see if it will catch on! It's based on the following philosophy that I live my work life
by:

The ability to deal with feedback is a great indicator of quality. So the earlier feedback can be captured and the
quicker it can be dealt with, the lower the cost of development and the high the quality of the end product. With that
in mind, there are numerous practises to capture feedback in the whole product development lifecycle, from unit testing
to watching users engage with the system.

The key automatable areas are:
* Static analysis (linting, test coverage)
* Automated testing (unit & acceptance)
* Monitoring (logging)
* Performance testing (stress, load, soak)

Now consider the ideal scenario of getting realtime feedback from every area above whilst you're coding. Then consider
that we're not that far off that ability with all the magic work of the community.

This project is aimted at helping us deliver better quality and drive our productivity through the roof!

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

Of course you can add the final two commands to your favourite IDE.

Disclaimer
----------
I'm originally a Java / Grails developer which means you shouldn't expect my Javascript disciplines to be amazing. I'd
love to see feedback and of course pull requests for anything you think could do with improvement.