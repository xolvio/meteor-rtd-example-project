describe("Players model", function() {

    it("is only added once to the Meteor.Collection", function() {
        expect(Meteor.addedCollections.players).toBe(1);
    });

});