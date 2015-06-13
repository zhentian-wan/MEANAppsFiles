/**
 * Created by Answer1215 on 5/18/2015.
 */
var Skill = require('mongoose').model('Skill');

exports.getSkills = function(req, res) {

    Skill.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};


exports.getSkillById = function(req, res) {
    Skill.findOne({_id: req.params.id}).exec(function(err, skill) {
        res.send(skill);
    })
};

exports.createSkill = function(req, res) {
    var skillData = req.body;

    // Data should be validate
    if(req.user.hasRole('admin') && skillData.title && skillData.description.length > 4) {
        // Skill title should not be duplicated
        Skill.create(skillData, function(err, skill) {
            if(err) {
                if(err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate name');
                }
                res.status(400).json({reason: err.toString()});
            } else {
                res.send(skill);
            }
        });
    } else {
        res.sendStatus(403);
    }
};

exports.deleteSkillById = function(req, res) {
    if(req.params._id) {
        Skill.findOne({_id: req.params.id}).remove().exec(function(err) {
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