var subRouters = {
    main: require("./main"),
    signUp: require("./signUp"),
    invitation: require("./invitation"),
    service: require("./service")
};

var subRouterConfig = {
    main: {
        "main": {
            method: "get",
            url: "/"
        }
    },
    signUp: {},
    invitation: {},
    service: {
        "aaa": {
            method: "get",
            url: "/service/aaa",
            default: {
                bbb: "ddd",
                ccc: ["a", "b", "e"]
            }
        }
    }
};

var Router = function(app) {
    this.app = app;
    this.initialize();
};

_ = Router.prototype;

_.initialize = function() {
    var key;

    for(key in subRouters) {
        this.registerRoutes(this.app, subRouters[key], subRouterConfig[key]);
    }
};

_.registerRoutes = function(app, subRouter, config) {
    for(var key in config) {
        if(!subRouter.hasOwnProperty(key)) {
            if(config[key].method == "get") {
                app.get(
                    config[key].url,
                    function(req, res) {
                        res.json(config[key].default);
                    }
                );
            } else {
                app.post(
                    config[key].url,
                    function(req, res) {
                        res.json(config[key].default);
                    }
                );
            }
        } else {
            if(config[key].method == "get") {
                app.get(
                    config[key].url,
                    subRouter[key]
                );
            } else {
                app.post(
                    config[key].url,
                    subRouter[key]
                );
            }
        }
    }
};

exports.initialize = function(app) {
    return new Router(app);
};