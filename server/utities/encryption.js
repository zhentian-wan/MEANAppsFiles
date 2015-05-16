/**
 * Created by Answer1215 on 5/15/2015.
 */
var crypto = require('crypto');

exports.createSalt = function (){
    return crypto.randomBytes(128).toString('base64');
}

exports.hashPwd = function(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}