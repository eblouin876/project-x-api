const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    user: String,
    piDevice: {
        arduinos: [{
            deviceId: String,
            comName: String,
            schedule: [{amount: String, day: String, time: String}],
            plantName: String,
            serialNumber: String,
            status: Number,
            data: {pump: Number, temperature: Number, humidity: Number}
        }],
        status: Number,
        deviceId: Number
    }
});

module.exports = mongoose.model("User", userSchema);
