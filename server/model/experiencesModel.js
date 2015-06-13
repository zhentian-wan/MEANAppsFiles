/**
 * Created by Answer1215 on 6/13/2015.
 */
var mongoose = require('mongoose'),
    skill = require('./skillsModel');

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

    var k = skill.getTagCategories(),
        wd = "Web Developer",
        cp = "Make Helsinki Ltd";

    Experience.create({
        keywords: [w, l],
        title: wd,
        startDate:  new Date('2014', '09', '01'),
        company: cp,
        description: "",
        image: "make.png"
    });
}


exports.createDefaultExperience = createDefaultExperience;