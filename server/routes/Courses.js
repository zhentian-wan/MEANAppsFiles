/**
 * Created by Answer1215 on 5/25/2015.
 */
var express = require('express'),
    router = express.Router({mergeParams: true}),
    courses = require('../controller/coursesController');

router.route('/')
    .get(courses.getCourses)
    .post(courses.createCourse);

router.route('/:id')
    .all(function(req, res, next) {
        next();
    })
    .get(courses.getCourseById)
    .delete(courses.deleteCourseById);


module.exports = router;