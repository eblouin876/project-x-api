const log = require("con-logger");
const Users = require("../models/users");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/api/test", function(req,res) {
    app.io("connection", function(socket) {
      console.log("Hello");
      socket.emit("Hi there");
    })
  });


  app.get("/api/getUpdate", isAuthenticated, function (req, res) { // NOTE: Does not require any req.body - reads all the paramas off the authenticated user
    Users.findOne({id: req.user.id}, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      res.send(data);
    });
  });

  app.post("/api/addSensor", isAuthenticated, function(req, res) {
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


  //   TODO: Add an update schedule route implementing findOneAndUpdate https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate



  //  TODO Used for testing locally
  // app.get("/api/getUpdate", function(req, res) {
  //   Users.findOne({ id: "5cc925b47e5939ae39b43151" }, (err, data) => {
  //     if (err) console.log(err);
  //     console.log(data.sensors);
  //     res.send(data.sensors);
  //   });
  // });

  // app.post("/api/addSensor", function(req, res) {
  //   // NOTE: Needs to be passed sensorId in  req.body
  //   let SID = req.body.sensorId;
  //   Users.findOne({ id: "5cc925b47e5939ae39b43151" }, (err, data) => {
  //     if (err) console.log(err);
  //     log(data);
  //     let exists = false;
  //     data.sensors.forEach(sensor => {
  //       if (sensor.sensorId === SID) {
  //         exists = true;
  //         res.send("Sensor already exists");
  //       }
  //     });
  //
  //     if (!exists) {
  //       Users.updateOne(
  //           { id: "5cc925b47e5939ae39b43151" },
  //           { $push: { sensors: { sensorId: SID } } },
  //           (err, data) => {
  //             if (err) console.log(err);
  //             log(data);
  //             res.send(data);
  //           }
  //       );
  //     }
  //   });
  // });
};
