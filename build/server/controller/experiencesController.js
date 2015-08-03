/**
 * Created by Answer1215 on 6/13/2015.
 */
var Experience = require('mongoose').model('Experience');

exports.getExperiences = function(req, res) {
    Experience.find({}).exec(function(err, experiences) {
        if(err){
            return res.json({reason: err});
        }else{
            res.json(experiences);
        }
    });
};