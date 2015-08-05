/**
 * Created by Answer1215 on 5/11/2015.
 */
var path = require('path'),
    rootPath = path.normalize(__dirname + "/../../");

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://zhentian:admin@ds031932.mongolab.com:31932/multivision',
        port: process.env.PORT || 80
    }
};