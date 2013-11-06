var Hooks;

(function () {
    "use strict";

    Hooks = function (world) {
        world.Before(function (callback) {
            var self = this;
            self.actions.visit('http://localhost:8000/reset').then(function () {
                self.actions.visit('http://localhost:8000/setupPlayers').then(function () {
                    self.actions.visit('http://localhost:8000').then(function () {
                        callback();
                    });
                });
            });
        });
    };

})();

module.exports = function (world) {
    "use strict";
    return new Hooks(world);
};