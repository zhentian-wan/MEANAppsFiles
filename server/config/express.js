/**
 * Created by Answer1215 on 5/11/2015.
 */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
    //compile stylus
    function compile(str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true)
            .use(nib())
            .import('nib');
    }

    // Set view page path
    app.set('views', config.rootPath + '/server/views');

    // Set jade
    app.set('view engine', 'jade');

    //logging
    app.use(logger('dev'));

    //bodyparser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //Use stylus
    app.use('/css', stylus.middleware(
        {
            src: config.rootPath + '/public'
            , compile: compile
        }
    ));

    //Any request comes in, will find the same filename file in public dir
    app.use(express.static( config.rootPath  + '/public'));
};