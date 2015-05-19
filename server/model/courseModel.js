/**
 * Created by Answer1215 on 5/18/2015.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    featured: {type: Boolean, required: '{PATH is required!}'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourss() {

    Course.find({}).exec(function(err, collection) {
        if(_.size(collection) == 0) {
            Course.create({tags: ['C#'],title: 'C#', featured: true, published: new Date('2011', '09', '11')});
            Course.create({tags: ["Java"],title: 'Java', featured: true, published: new Date('2010', '04', '28')});
            Course.create({tags: ["Javascript"],title: 'Javascript', featured: true, published: new Date('2011', '11', '11')});
            Course.create({tags: ["Javascript"],title: 'jQuery', featured: false, published: new Date('2015', '03', '05')});
            Course.create({tags: ["Javascirpt"],title: 'Node.js', featured: true, published: new Date('2014', '05', '30')});
            Course.create({tags: ["Javascirpt"],title: 'AngularJS', featured: true, published: new Date('2014', '04', '05')});
            Course.create({tags: ["Javascirpt"],title: 'Backbone.js', featured: false, published: new Date('2015', '06', '05')});
            Course.create({tags: ["Javascirpt"],title: 'Express', featured: true, published: new Date('2014', '09', '15')});
        }
    });
}

exports.createDefaultCourss = createDefaultCourss;