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

    var e = "Elementary",
        w = "Web",
        s = "Server",
        m = "Mobile",
        f = "Framework",
        d = "Database",
        t = "Testing",
        l = "Library";

    Skill.find({}).exec(function(err, collection) {
        if(_.size(collection) == 0) {
            Skill.create({
                tags: [e],
                title: 'C#',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            Skill.create({
                tags: [e],
                title: 'Java',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2010', '03', '01')
            });
            Skill.create({
                tags: [w, e],
                title: 'Javascript',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '11', '01')
            });
            Skill.create({
                tags: [w, l],
                title: 'jQuery',
                mastered: true, 
                know: false,
                learning: false,
                published: new Date('2011', '11', '01')
            });
            Skill.create({
                tags: [s, w],
                title: 'Node.js',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '05', '01')
            });
            Skill.create({
                tags: [w, f],
                title: 'AngularJS',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '07', '01')
            });
            Skill.create({
                tags: [w, s, f],
                title: 'Express.js',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '07', '01')
            });
            Skill.create({
                tags: [d],
                title: 'MongoDB',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '09', '01')
            });
            Skill.create({
                tags: [w,t],
                title: 'Karma Jasmine',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2014', '09', '01')
            });
            Skill.create({
                tags: [f, w, s],
                title: 'Ruby on Rails',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '12', '01')
            });
            Skill.create({
                tags: [s, w],
                title: 'PHP',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            Skill.create({
                tags: [s, w, f],
                title: 'CakePHP',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '09', '01')
            });Skill.create({
                tags: [s, w, f],
                title: 'Zend Framework',
                mastered: true,
                know: false,
                learning: false,
                published: new Date('2011', '09', '01')
            });
            Skill.create({
                tags: [m],
                title: 'Android',
                mastered: false,
                know: true,
                learning: false,
                published: new Date('2014', '06', '01')
            });
            Skill.create({
                tags: [w, f],
                title: 'React',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '01', '01')
            });
            Skill.create({
                tags: [w, l],
                title: 'RxJS',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '05', '01')
            });
            Skill.create({
                tags: [w, l],
                title: 'lodash',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '05', '01')
            });
            Skill.create({
                tags: [w, l],
                title: 'D3.js',
                mastered: false,
                know: true,
                learning: true,
                published: new Date('2015', '06', '01')
            });
            Skill.create({
                tags: [d],
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