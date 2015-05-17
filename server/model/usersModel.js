var mongoose = require('mongoose'),
    _ = require('lodash'),
    encrypt = require('../utities/encryption');


//Users data
var userSchema = mongoose.Schema({
    firstName: {type:String, required: '{PATH} is required!'},
    lastName: {type:String, required: '{PATH} is required!'},
    username: {type:String, required: '{PATH} is required!', unique: true},
    salt: String,
    hash_pwd: String,
    role: [String]
});
userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hash_pwd;
    }
};

var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function() {
    User.find({}).exec(function(err, collection){
        if(_.size(collection) === 0){
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'John');
            User.create({firstName: 'John', lastName: 'Linquist', username: 'John', salt: salt, hash_pwd: hash, role: 'admin'});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Ken');
            User.create({firstName: 'Ken', lastName: 'CD', username: 'Ken', salt: salt, hash_pwd: hash, role: ''});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Ben');
            User.create({firstName: 'Ben', lastName: 'Cophen', username: 'Ben', salt: salt, hash_pwd: hash});
        }
    })
};

