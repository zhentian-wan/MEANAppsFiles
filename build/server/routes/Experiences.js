/**
 * Created by Answer1215 on 6/13/2015.
 */
var express = require('express'),
    router = express.Router({mergeParams: true}),
    experiences = require('../controller/experiencesController');

router.route('/')
    .get(experiences.getExperiences);

module.exports = router;