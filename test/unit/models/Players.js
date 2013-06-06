(function () {

    "use strict";

    describe("Players model", function () {

        it("is only added once to the Meteor.Collection", function () {
            expect(Meteor.instantiationCounts.players).toBe(1);
        });

    });

})();