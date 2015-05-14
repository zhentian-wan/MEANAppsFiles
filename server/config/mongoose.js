
var mongoose = require('mongoose'),
    _ = require('lodash'),
    crypto = require('crypto');

module.exports = function(config){

    //Use Mongoose
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback(){
        console.log('db opened');
    });

    //Users data
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hash_pwd: String,
        role: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hash_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(_.size(collection) === 0){
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'John');
            User.create({firstName: 'John', lastName: 'Linquist', username: 'John', salt: salt, hash_pwd: hash, role: 'admin'});
            salt = createSalt();
            hash = hashPwd(salt, 'Ken');
            User.create({firstName: 'Ken', lastName: 'CD', username: 'Ken', salt: salt, hash_pwd: hash, role: ''});
            salt = createSalt();
            hash = hashPwd(salt, 'Ben');
            User.create({firstName: 'Ben', lastName: 'Cophen', username: 'Ben', salt: salt, hash_pwd: hash});
        }
    })
}

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}