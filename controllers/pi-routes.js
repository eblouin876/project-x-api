const log = require("con-logger");
const Users = require("../models/users");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const broadcast = require("../config/middleware/broadcast");

module.exports = function (app) {

    // Route to get all of the arduino's data associated with the  account
    app.get("/api/arduinos", isAuthenticated, function (req, res) { // NOTE: Does not require any req.body - reads all the paramas off the authenticated user
        Users.findOne({id: req.user.id}, (err, data) => {
            if (err) console.log(err);
            res.send(data);
        });
    });

    // Route to update an existing arduino (for schedule)
    app.post("/api/updateArduinos", isAuthenticated, broadcast, function (req, res) {
        Users.findOneAndUpdate({id: req.user.id}, {piDevice: req.body})
            .catch(err => {
                if (err) console.log(err)
            }).then(data => res.send(data));
    });

    // Route to update single arduino. Needs schedule, plantName, and deviceId in the req.body
    app.post("/api/updateArduino", isAuthenticated, broadcast, function (req, res) {
        Users.update({id: req.user.id, "piDevice.deviceId": req.body.deviceId},
            {"piDevice.$.schedule": req.body.schedule,
            "piDevice.$.plantName": req.body.plantName
            } )
            .catch(err => {
                if(err) console.log(err)
            }).then (data => res.send(data))
    })


};
