/**
 * Created by Answer1215 on 6/13/2015.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

var expSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    company: {type: String, required: '{PATH is required!}'},
    startDate: {type: Date, required: '{PATH} is required!'},
    endDate: {type: Date, default: null},
    isEnd: {type: Boolean, default: false},
    keywords: [String],
    description: {type: String, required: '{PATH} is required!'},
    image: {type: String, required: '{PATH} is required!'}
});

var Experience = mongoose.model('Experience', expSchema);

function createDefaultExperience() {

    var wd = "Web Developer",
        cp = "Make Helsinki Ltd",
        uef = "University of Eastern Finland";

    Experience.find({}).exec(function(err, collection) {
        if(_.size(collection) == 0) {
            Experience.create({
                keywords: ["AngularJS", "Node.js", "Express.js", "MongoDB", "Bootstrap", "MEAN"],
                title: wd,
                startDate: new Date('2014', '11'),
                company: cp,
                description: "Several sites by using AngularJS framework and Node.js & Express.js.",
                image: "make.png"
            });
            Experience.create({
                keywords: ["MODx", "PHP", "Bootstrap"],
                title: wd,
                startDate: new Date('2014', '11'),
                company: cp,
                description: "I was working on Content management system (CMS) based on MODx for several websites.",
                image: "make.png"
            });
            Experience.create({
                keywords: ["PHP", "CakePHP", "AngularJS", "Bootstrap"],
                title: wd,
                startDate: new Date('2014', '8'),
                endDate: new Date('2014', '11'),
                isEnd: true,
                company: cp,
                description: "I was working on CakePHP & AngualrJS for a website.",
                image: "make.png"
            });
            Experience.create({
                keywords: ["PHP", "Javascript", "jQuery", "MySQL", "Google maps API", "Facebook API"],
                title: wd,
                startDate: new Date('2012', '5'),
                endDate: new Date('2014', '5'),
                isEnd: true,
                company: uef,
                description: "I was working on Location-based application with Google maps API, PHP, MySQL & Javascript.",
                image: "uef.png"
            });
        }
    });
}


exports.createDefaultExperience = createDefaultExperience;