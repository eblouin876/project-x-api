var passport = require("passport");
const Auth = require("../models/auth");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(Auth.authenticate()));
passport.serializeUser(Auth.serializeUser());
passport.deserializeUser(Auth.deserializeUser());

module.exports = passport;
