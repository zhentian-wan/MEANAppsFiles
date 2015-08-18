var mongoose = require('mongoose'),
    _ = require('lodash'),
    encrypt = require('../utities/encryption');

require('mongoose-type-email');


//Users data
var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    username: {type: String, required: '{PATH} is required!', unique: true},
    email: {type: mongoose.SchemaTypes.Email, required: '{PATH} is required!', unique: true},
    salt: String,
    hash_pwd: String,
    role: [String]
});
userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hash_pwd;
    },
    hasRole: function(role) {
        return this.role.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

exports.createDefaultUsers = function() {
    User.find({}).exec(function(err, collection) {
        if(_.size(collection) === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'wan');
            User.create({
                firstName: 'zhentian',
                lastName: 'wan',
                username: 'wan',
                email: 'answer881215@gmail.com',
                salt: salt,
                hash_pwd: hash,
                role: 'admin'
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ken');
            User.create({
                firstName: 'ken',
                lastName: 'CD',
                username: 'ken',
                email: 'zhentian@makehelsinki.com',
                salt: salt,
                hash_pwd: hash,
                role: ''
            });
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'ben');
            User.create({
                firstName: 'ben',
                lastName: 'Cophen',
                username: 'ben',
                email: 'joel@egghead.io',
                salt: salt,
                hash_pwd: hash
            });
        }
    })
};

