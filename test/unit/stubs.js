//noinspection ThisExpressionReferencesGlobalObjectJS
var _GLOBAL = this;

var Meteor = {
    startup: function (newStartupFunction) {
        Meteor.startup = newStartupFunction;
    },
    addedCollections: {},
    Collection: function(modelName) {
        console.log(modelName, Meteor.addedCollections[modelName]);
        if (Meteor.addedCollections[modelName]) {
            Meteor.addedCollections[modelName]++;
        } else {
            Meteor.addedCollections[modelName] = 1;
        }
    }
};

var Template = {
    "stub": function (templateName) {
        this[templateName] = {
            "events": function (events) {
                this.events = events;
            }
        };
    }
};

var Models = {
    "stub": function(modelName) {
        _GLOBAL[modelName] = {
            find : function () {},
            insert : function () {}
        };
    }
};

var Session = {
    store: {},
    get: function(key) {
        return this.store[key];
    },
    set: function(key, value) {
        this.store[key] = value;
    },
    equals: function(key, value) {
        return this.store[key] === value;
    }
};

var Random = {
    fraction: function() {
    }
};
