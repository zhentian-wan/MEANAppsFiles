/**
 * Created by Answer1215 on 5/15/2015.
 */
var crypto = require('crypto'),
    apiCheck = require('./apiCheck');

exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
};

var hashPwd_api = [
    apiCheck.string,
    apiCheck.string
];

exports.hashPwd = function(salt, pwd) {

    apiCheck.throw(hashPwd_api, arguments);
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};