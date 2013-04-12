(function () {
    "use strict";

    var createRoute = function(route, handler) {
        __meteor_bootstrap__.app.stack.splice(0, 0, {
            route: '/' + route,
            handle: function (req, res) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                handler(req, res);
                res.end(route + ' complete');
            }.future()
        });
    };

    Meteor.startup(function () {

        createRoute('reset', function() {
            Meteor.users.remove({});
            Players.remove({});
        });

        createRoute('setupPlayers', function() {
            var names = ["Ada Lovelace",
                "Grace Hopper",
                "Marie Curie",
                "Carl Friedrich Gauss",
                "Nikola Tesla",
                "Claude Shannon"];
            for (var i = 0; i < names.length; i += 1) {
                Players.insert({name: names[i], score: i * 10});
            }
        });

    });
})();