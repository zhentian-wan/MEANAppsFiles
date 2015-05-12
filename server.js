/**
 * Created by Answer1215 on 5/5/2015.
 */
var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = new express();
var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

app.listen(config.port);

console.log("Server is listening at " + config.port);

