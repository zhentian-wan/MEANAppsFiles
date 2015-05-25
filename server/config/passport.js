/**
 * Created by Answer1215 on 5/14/2015.
 */
var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy; // Twitter, Facebook stuff

var User = mongoose.model('User');
module.exports = function() {

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({username: username}).exec(function(err, user) {

                if(user && user.authenticate(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        if(user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
};