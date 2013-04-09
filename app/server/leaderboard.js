(function () {
    "use strict";

    Meteor.startup(function () {
        if (Players.find().count() === 0) {
            var names = ["Ada Lovelace",
                "Grace Hopper",
                "Marie Curie",
                "Carl Friedrich Gauss",
                "Nikola Tesla",
                "Claude Shannon"];
            for (var i = 0; i < names.length; i += 1) {
                Players.insert({name: names[i], score: Math.floor(Random.fraction() * 10) * 5});
            }
        }
    });

})();