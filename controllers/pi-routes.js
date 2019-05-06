const log = require("con-logger");
const Users = require("../models/users");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const broadcast = require("../config/middleware/broadcast");

module.exports = function (app) {

  app.get("/api/arduinos", isAuthenticated, function (req, res) { // NOTE: Does not require any req.body - reads all the paramas off the authenticated user
    Users.findOne({id: req.user.id}, (err, data) => {
      if (err) console.log(err);
      console.log(data.sensors);
      res.send(data.sensors);
    });
  });

  // TODO: Add a new device
  app.post("/api/addArduino", isAuthenticated, broadcast, function(req, res) {
    // NOTE: Needs to be passed sensorId in  req.body
    let SID = req.body.sensorId;
    let UID = req.user.id
    Users.findOne({ id: UID }, (err, data) => {
      if (err) console.log(err);
      log(data);
      let exists = false;
      data.sensors.forEach(sensor => {
        if (sensor.sensorId === SID) {
          exists = true;
          res.send("Sensor already exists");
        }
      });

      if (!exists) {
        Users.updateOne(
            { id: UID },
            { $push: { sensors: { sensorId: SID } } },
            (err, data) => {
              if (err) console.log(err);
              log(data);
              res.send(data);
            }
        );
      }
    });
  });

  app.post("/api/updateArduino", isAuthenticated, broadcast, function(req,res) {});
  //   TODO: Add an update schedule route implementing findOneAndUpdate https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

  app.delete("/api/deleteArduino", isAuthenticated, broadcast, function(req,res) {});

};
