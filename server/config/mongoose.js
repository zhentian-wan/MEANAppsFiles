
var mongoose = require('mongoose'),
    userModel = require('../model/usersModel');


module.exports = function(config){

    //Use Mongoose
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback(){
        console.log('db opened');
    });

    userModel.createDefaultUsers();
}

