/**
 * Created by Answer1215 on 5/18/2015.
 */
var Course = require('mongoose').model('Course');

 exports.getCourses = function(req, res) {
     Course.find({}).exec(function(err, collection) {
         res.send(collection);
     });
 };