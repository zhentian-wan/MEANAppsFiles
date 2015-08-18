/**
 * Created by Answer1215 on 5/18/2015.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Promise = require('bluebird');

var skillSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!', unique: true},
    mastered: {type: Boolean, required: '{PATH is required!}'},
    know: {type: Boolean, required: '{PATH} is required!'},
    learning: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

var SkillModel = mongoose.model('Skill', skillSchema);


function getTagCategories() {
    var e = "Elementary",
        w = "Web",
        s = "Server",
        m = "Mobile",
        f = "Framework",
        d = "Database",
        t = "Testing",
        l = "Library";

    return {
        e: e,
        w: w,
        s: s,
        m: m,
        f: f,
        d: d,
        t: t,
        l: l
    };
}

function createDefaultSkills() {

    var c = getTagCategories();

    SkillModel.find({}).exec(function(err, collection) {
        if(_.size(collection) == 0) {
            SkillModel.create({
                tags: [c.e],
                title: 'C#',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            SkillModel.create({
                tags: [c.e],
                title: 'Java',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2010', '03', '01')
            });
            SkillModel.create({
                tags: [c.w, c.e],
                title: 'Javascript',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '11', '01')
            });
            SkillModel.create({
                tags: [c.w, c.l],
                title: 'jQuery',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '11', '01')
            });
            SkillModel.create({
                tags: [c.s, c.w],
                title: 'Node.js',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '05', '01')
            });
            SkillModel.create({
                tags: [c.w, c.f],
                title: 'AngularJS',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '07', '01')
            });
            SkillModel.create({
                tags: [c.w, c.s, c.f],
                title: 'Express.js',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '07', '01')
            });
            SkillModel.create({
                tags: [c.d],
                title: 'MongoDB',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '09', '01')
            });
            SkillModel.create({
                tags: [c.w, c.t],
                title: 'Karma Jasmine',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '09', '01')
            });
            SkillModel.create({
                tags: [c.f, c.w, c.s],
                title: 'Ruby on Rails',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '12', '01')
            });
            SkillModel.create({
                tags: [c.s, c.w],
                title: 'PHP',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            SkillModel.create({
                tags: [c.s, c.w, c.f],
                title: 'CakePHP',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            SkillModel.create({
                tags: [c.s, c.w, c.f],
                title: 'Zend Framework',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            SkillModel.create({
                tags: [c.m],
                title: 'Android',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '06', '01')
            });
            SkillModel.create({
                tags: [c.d],
                title: 'Firebase',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '10', '01')
            });
            SkillModel.create({
                tags: [w, f],
                title: 'React',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '01', '01')
            });
            SkillModel.create({
                tags: [c.w, c.l],
                title: 'RxJS',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '05', '01')
            });
            SkillModel.create({
                tags: [c.w, c.l],
                title: 'lodash',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '05', '01')
            });
            SkillModel.create({
                tags: [c.w, c.l],
                title: 'D3.js',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '06', '01')
            });
            SkillModel.create({
                tags: [c.d],
                title: 'MySQL',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2015', '06', '01')
            });
        }
    });
}

function getSkills() {
    return new Promise(function(resolve, reject) {
        SkillModel.find({}).exec(function(err, collection) {
            if(err) {
                reject(err);
            } else {
                resolve(collection);
            }
        });
    });
}

function getSkillById(skillId) {
    return new Promise(function(resolve, reject) {
        SkillModel.findOne({_id: skillId}).exec(function(err, skill) {
            if(err) {
                reject(err);
            } else {
                resolve(skill);
            }
        })
    })
}

function addNewSkill(skillData) {
    return new Promise(function(resolve, reject) {
        SkillModel.create(skillData, function(err, skill) {
            if(err) {
                if(err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate name');
                }
                reject(err);
            } else {
                resolve(skill);
            }
        });
    });
}


function deleteSkillById(skillId) {

    return new Promise(function(resolve, reject) {
        Skill.findOne({_id: skillId}).remove().exec(function(err) {
            if(err) {
                reject(err);
            }else{
                resolve();
            }
        });
    })
}

exports.createDefaultSkills = createDefaultSkills;
exports.getTagCategories = getTagCategories;
exports.getSkills = getSkills;
exports.getSkillById = getSkillById;
exports.addNewSkill = addNewSkill;
exports.deleteSkillById = deleteSkillById;