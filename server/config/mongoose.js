var mongoose = require('mongoose'),
    courseModel = require('../model/skillsModel'),
    userModel = require('../model/usersModel'),
    experienceModel = require('../model/experiencesModel');


module.exports = function(config) {

    //Use Mongoose
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('db opened');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultSkills();
    experienceModel.createDefaultExperience();
};

