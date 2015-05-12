/**
 * Created by Answer1215 on 5/11/2015.
 */
var mongoose = require('mongoose');

module.exports = function(config){

    //Use Mongoose
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback(){
        console.log('db opened');
    });
}