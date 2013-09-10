(function () {
    "use strict";

    var createRoute = function (route, handler) {
        var connectHandlers;
        if (typeof __meteor_bootstrap__.app !== 'undefined') {
            connectHandlers = __meteor_bootstrap__.app;
        } else {
            connectHandlers = WebApp.connectHandlers;
        }
        connectHandlers.stack.splice(0, 0, {
            route: '/' + route,
            handle: function (req, res) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                handler(req, res);
                res.end(route + ' complete');
            }.future()
        });
    };

    var reset = function () {
        Meteor.users.remove({});
        Players.remove({});
    };

    var setupPlayers = function () {
        var names = ["Ada Lovelace",
            "Grace Hopper",
            "Marie Curie",
            "Carl Friedrich Gauss",
            "Nikola Tesla",
            "Claude Shannon"];
        for (var i = 0; i < names.length; i += 1) {
            Players.insert({name: names[i], score: i * 10});
        }
    };

    Meteor.startup(function () {
        reset();
        createRoute('reset', reset);
        createRoute('setupPlayers', setupPlayers);
    });
})();