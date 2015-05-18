/**
 * Created by Answer1215 on 5/15/2015.
 */
var User = require('mongoose').model('User'),
    encrypt = require('../utities/encryption');


exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hash_pwd = encrypt.hashPwd(userData.salt, userData.password);

    User.create(userData, function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate name');
            }
            res.status(400);
            res.send({reason: err.toString()});
        }

        req.login(user, function(err) {
            if(err) {
                return next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function(req, res) {
    var userData = req.body;
    
    if(req.user._id != userData._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userData.firstName;
    req.user.lastName = userData.lastName;
    req.user.username = userData.username;
    console.log(userData.password);
    console.log(userData.password.length);
    if(userData.password && userData.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hash_pwd = encrypt.hashPwd(req.user.salt, userData.password);
        console.log(req.user.hash_pwd);
    }

    req.user.save(function(err) {
        if(err){
            res.status(400);
            return res.send({reason: err.toString()});
        }

        res.send(req.user);

    });
}
;