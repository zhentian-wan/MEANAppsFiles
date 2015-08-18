/**
 * Created by Answer1215 on 5/18/2015.
 */
//var Skill = require('mongoose').model('Skill');
var Skill = require('../model/skillsModel');

exports.getSkills = function(req, res) {

    Skill.getSkills().then(function(collection) {
        res.send(collection);
    }).catch(function(error) {
        res.status(403).json({reason: error.toString()});
    }).finally(function() {
        // LOG
    });
};


exports.getSkillById = function(req, res) {

    Skill.getSkillById(req.params.id).then(function(skill) {
        res.send(skill);
    }).catch(function(error) {
        res.status(403).json({reason: error.toString()});
    }).finally(function() {
        // LOG
    });
};

exports.addNewSkill = function(req, res) {

    var skillData = req.body;
    // Data should be validate
    if(req.user.hasRole('admin') && skillData.title && skillData.description.length > 4) {
        Skill.createSkill(skillData).then(function(skill){
            res.send(skill);
        }).catch(function(error){
            res.status(400).json({reason: error.toString()});
        }).finally(function(){
            //Log
        });
    } else {
        res.sendStatus(403);
    }
};

exports.deleteSkillById = function(req, res) {
    if(req.params._id) {
        Skill.deleteSkillById(req.params.id).then(function() {
            res.sendStatus(200);
        }).catch(function(error) {
            res.sendStatus(403);
        }).finally(function() {
            //Log
        });
    } else {
        res.sendStatus(403);
    }
};