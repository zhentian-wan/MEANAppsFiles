/**
 * Created by Answer1215 on 5/18/2015.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

var skillSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!', unique: true},
    mastered: {type: Boolean, required: '{PATH is required!}'},
    know: {type: Boolean, required: '{PATH} is required!'},
    learning: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

var Skill = mongoose.model('Skill', skillSchema);

function createDefaultSkills() {

    Skill.find({}).exec(function(err, collection) {
        if(_.size(collection) == 0) {
            Skill.create({
                tags: ['C#'],
                title: 'C#',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            Skill.create({
                tags: ["Java"],
                title: 'Java',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2010', '03', '01')
            });
            Skill.create({
                tags: ["Javascript", "Web"],
                title: 'Javascript',
                mastered: true,
                know: true,
                learning: false,
                published: new Date('2011', '11', '01')
            });
            Skill.create({
                tags: ["Javascript", "jQuery", "Web"],
                title: 'jQuery',
                mastered: true,
                know: true,
                learning: false,
                published: new Date('2011', '11', '01')
            });
            Skill.create({
                tags: ["Javascirpt", 'Node', "Web", "Server"],
                title: 'Node.js',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '05', '01')
            });
            Skill.create({
                tags: ["Javascirpt", 'AngularJS', "Web"],
                title: 'AngularJS',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '07', '01')
            });
            Skill.create({
                tags: ["Javascirpt", "Express", "Node", "Web", "Server"],
                title: 'Express.js',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '07', '01')
            });
            Skill.create({
                tags: ["Javascirpt", "Database", "NoSQL", "Web"],
                title: 'MongoDB',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '09', '01')
            });
            Skill.create({
                tags: ["Javascirpt", "Karma", "Testing", "Web"],
                title: 'Karma Jasmine',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '09', '01')
            });
            Skill.create({
                tags: ["Ruby", "Rails", "Web"],
                title: 'Ruby on Rails',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '12', '01')
            });
            Skill.create({
                tags: ["PHP", "Web"],
                title: 'PHP',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            Skill.create({
                tags: ["Android", "Mobile"],
                title: 'Android',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '06', '01')
            });
            Skill.create({
                tags: ["React", "Web"],
                title: 'React',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '01', '01')
            });
            Skill.create({
                tags: ["RxJS", "Web"],
                title: 'RxJS',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '05', '01')
            });
            Skill.create({
                tags: ["D3", "Web"],
                title: 'D3.js',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '06', '01')
            });
            Skill.create({
                tags: ["MySQL", "Database"],
                title: 'MySQL',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2015', '06', '01')
            });
        }
    });
}

exports.createDefaultSkills = createDefaultSkills;