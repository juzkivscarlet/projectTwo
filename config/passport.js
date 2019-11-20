var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.use(new LocalStrategy(
    {usernameField: "username"}, function(username,password,done) {
        db.Users.findOne({
            where: {
                username: username
            }
        }).then((user) => {
            if(!user) {
                return done(null,false,{
                    message: "Incorrect username."
                });
            }
            else if(!user.validPassword(password)) {
                return done(null,false,{
                    message: "Incorrect password."
                });
            }

            return done(null,user);
        });
    }
));

passport.serializeUser((user,cb) => {
    cb(null,user);
});

passport.deserializeUser((obj,cb) => {
    cb(null,obj);
});

module.exports = passport;