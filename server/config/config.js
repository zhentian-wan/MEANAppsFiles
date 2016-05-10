/**
 * Created by Answer1215 on 5/11/2015.
 */
var path = require('path'),
    rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://zhentain:881215@ds019472.mlab.com:19472/heroku_bwfngp4m',
        port: process.env.PORT || 80
    }
};
