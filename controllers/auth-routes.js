const passport = require("passport");
const Auth = require("../models/auth");
const log = require("con-logger");
const Users = require("../models/users");

module.exports = function (app) {
    app.post("/api/register", function (req, res) {
        // NOTE: This takes an object with  keys username, password, deviceId. It should require all 3
        const deviceId = req.body.deviceId;
        // Registers a new user. Will not work if the username has already been used
        Auth.register(
            new Auth({username: req.body.username}),
            req.body.password,
            function (err) {
                if (err) {
                    log(err);
                    return res.send("Unable to register user account");
                }
                // Authenticates the user upon successful creation
                passport.authenticate("local")(req, res, function () {
                    log(req.user.id);
                    // Adds to the users collection creating a new instance that hosts all the data
                    Users.create(
                        {
                            id: req.user.id,
                            user: req.user.username,
                            piDevice: {deviceId: deviceId}
                        },
                        (err) => {
                            if (err){
                                log(err);
                                return res.send(err)
                            } else {
                            res.send({UID: req.user.id, deviceId: deviceId});
                            }
                        }
                    );
                });
            }
        );
    });

    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // NOTE: this takes an  object with  keys username, password
        res.send({UID: req.user.id});
    });

    app.post("/api/logout", function(req, res) {
      req.logout();
      res.send("Logged out");
    });

    app.get("/", function(req,res) {
        res.send("Welcome to our api")
    })

    // app.get("/api/users", function(req, res) {
    //   Users.find({}, (err, data) => {
    //     if (err) log(err);
    //     res.send(data);
    //   });
    // });
    //
    // app.get("/api/accounts", function(req, res) {
    //   Auth.find({}, (err, data) => {
    //     if (err) log(err);
    //     res.send(data);
    //   });
    // });
    //
    // app.get("/api/reset", function (req, res) {
    //     Auth.remove({}, err => {
    //         if (err) log(err);
    //         Users.remove({}, err => {
    //             if (err) log(err);
    //             res.send("User and auth database reset");
    //         });
    //     });
    // });
};

// req.user.username returns the username, req.user.id returns the unique id
