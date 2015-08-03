/**
 * Created by Answer1215 on 5/25/2015.
 */
var express = require('express'),
    router = express.Router({mergeParams: true}),
    skills = require('../controller/skillsController');

router.route('/')
    .get(skills.getSkills)
    .post(skills.createSkill);

router.route('/:id')
    .all(function(req, res, next) {
        next();
    })
    .get(skills.getSkillById)
    .delete(skills.deleteSkillById);


module.exports = router;