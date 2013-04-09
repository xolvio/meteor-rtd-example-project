Meteor.startup(function () {
    __meteor_bootstrap__.app.stack.splice(0, 0, {
        route: '/reset',
        handle: function (req, res, next) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            Players.remove({});
            var names = ["Ada Lovelace",
                "Grace Hopper",
                "Marie Curie",
                "Carl Friedrich Gauss",
                "Nikola Tesla",
                "Claude Shannon"];
            for (var i = 0; i < names.length; i+=1) {
                Players.insert({name: names[i], score: i * 10});
            }
            res.end("reset complete");
            return;
        }.future()
    });
});