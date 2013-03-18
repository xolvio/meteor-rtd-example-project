meteor-testacular-aws-boilerplate
=================================

A boilerplate project to use for creating a meteor app with testacular and running on Amazon Web Services. The goals here are:

* True unit testing with meteor, with all the stubs and mocks needed for this
* End-to-end UI-level testing, also running in the background using PhantomJS
* Deployment to AWS from within the project using command-line tools

Testing Philosophy
------------------
I'm a beleiver that you only need to have two levels of testing: Unit and Features. In my experience, as a developer I should have two users in mind when writing code: the end-user (feature level) and other developers (unit level). 

My prefrence is to start with a feature test and break it down to into valuable user-centric vertical slices. Then for each slice, break down into the units needed to fulfil it. I do this by drilling down the stack one level at a time, driving every unit of code with tests, until the slice is complete. I find this disciplined approach gets exceptionally good test coverage.

There are some challanges when doing this with frameworks, and Meteor is no exception. Meteor introduces a convention to do all it's magic. The challange is to tap into that convention and exposing the units of code I've written, so they can be unit tested.

Instructions
------------
Make sure you have installed testacular globally

```bash
  npm install -g testacular
```
  
and from the command line, cd into the project directory and type
```bash
  testacular start
```  
Of course you can add this to yoru favourite IDE also. I have this running within WebStorm.

