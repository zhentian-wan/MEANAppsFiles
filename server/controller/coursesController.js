/**
 * Created by Answer1215 on 5/18/2015.
 */
var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
    Course.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};


exports.getCourseById = function(req, res) {
    Course.findOne({_id: req.params.id}).exec(function(err, course) {
        res.send(course);
    })
};

exports.createCourse = function(req, res) {
    var courseData = req.body;

    // Data should be validate
    if(req.user.hasRole('admin') && courseData.title && courseData.description.length > 4) {
        // Course title should not be duplicated
        Course.create(courseData, function(err, course) {
            if(err) {
                if(err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate name');
                }
                res.status(400).json({reason: err.toString()});
            } else {
                res.send(course);
            }
        });
    } else {
        res.sendStatus(403);
    }
};

exports.deleteCourseById = function(req, res) {
    if(req.params._id) {
        Course.findOne({_id: req.params.id}).remove().exec(function(err) {
            if(err) {
                //TODO, not found
                return res.sendStatus(403);
            }

            res.sendStatus(200);
        });
    } else {
        res.sendStatus(403);
    }
};