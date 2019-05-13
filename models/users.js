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
            active: Boolean,
            data: {pumpStatus: String, temperature: String, humidity: String, moisture: String, lightPin: String}
        }],
        status: Number,
        deviceId: Number
    }
});

module.exports = mongoose.model("User", userSchema);
