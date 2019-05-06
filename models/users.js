const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    user: String,
    deviceId: String,
    discovery: {type: Boolean, default: false},
    sensors: [
        {
            sensorId: String, // Check against comPortId
            comPortId: String, // Assigned to specific device id
            schedule: [{duration: Number, days: [{day: String, time: Number}]}],
            name: String
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
