(function () {
    "use strict";

    Template.leaderboard.players = function () {
        return Players.find({}, {sort: {score: -1, name: 1}});
    };

    Template.leaderboard.selected_name = function () {
        var player = Players.findOne(Session.get("selected_player"));
        return player && player.name;
    };

    Template.player.selected = function () {
        return Session.equals("selected_player", this._id) ? "selected" : '';
    };

    Template.leaderboard.events({
        'click input.inc': function () {
            Players.update(Session.get("selected_player"), {$inc: {score: 5}});
        }
    });

    Template.player.events({
        'click': function () {
            Session.set("selected_player", this._id);
        }
    });

})();