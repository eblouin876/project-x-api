const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Auth = new Schema({ username: String, password: String });

Auth.plugin(passportLocalMongoose);

module.exports = mongoose.model("Auth", Auth);
