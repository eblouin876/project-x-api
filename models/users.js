const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    user: String,
    piDevice: {
        arduinos: [{
            deviceId: String,
            comName: String,
            schedule: [{duration: Number, days: [{day: String, time: Number}]}],
            plantName: String,
            serialNumber: String,
            status: Number
        }],
        status: Number,
        deviceId: Number
    }
});

module.exports = mongoose.model("User", userSchema);
