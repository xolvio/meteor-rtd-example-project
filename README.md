meteor-testacular-aws-boilerplate
=================================

A template project to use for creating a meteor app with testacular and running on Amazon Web Services.

Testing Philosophy
------------------
I'm a beleiver that you only need to have two levels of testing: Unit and Features. In my experience, as a developer I should have two users in mind when writing code: the end-user (feature level) and other developers (unit level). 

My prefrence is to start with a feature test and break it down to into valuable user-centric vertical slices. Then for each slice, break down into the units needed to fulfil it. I do this by drilling down the stack one level at a time, driving every unit of code with tests, until the slice is complete. I find this disciplined approach gets exceptionally good test coverage and actually becomes quite quick over time.

There are some challanges when doing this with frameworks, and Meteor is no exception. Meteor introduces a convention to do all it's magic. The challange is to tap into that convention and exposing the units of code I've written, so they can be unit tested.

