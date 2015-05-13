/**
 * Created by Answer1215 on 5/11/2015.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

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
        username: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(_.size(collection) === 0){
            User.create({firstName: 'John', lastName: 'Linquist', username: 'John'});
            User.create({firstName: 'Ken', lastName: 'CD', username: 'Ken'});
            User.create({firstName: 'Ben', lastName: 'Cophen', username: 'Ben'});
        }
    })
}