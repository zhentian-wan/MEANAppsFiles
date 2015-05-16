/**
 * Created by Answer1215 on 5/15/2015.
 */
var User = require('mongoose').model('User'),
    encrypt = require('../utities/encryption');


exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.salt = encrypt.createSalt();
    userData.hash_pwd = encrypt.hashPwd(userData.salt, userData.password);

    User.create(userData, function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }

        req.login(user, function(err) {
            if(err) {return next(err);}
            res.send(user);
        });
    })
};