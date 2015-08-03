/**
 * Created by Answer1215 on 5/11/2015.
 */
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    //compile stylus
    function compile(str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true);
    }

    // Set view page path
    app.set('views', config.rootPath + '/server/views');

    // Set jade
    app.set('view engine', 'jade');

    //logging, check more about morgan TODO
    app.use(logger('dev'));

    //cookieParser
    app.use(cookieParser());

    //bodyparser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({secret: 'multi vision unicorns', resave: false, saveUninitialized: false}));
    app.use(passport.initialize());
    app.use(passport.session());
    //Use stylus
    app.use('/css', stylus.middleware(
        {
            src: config.rootPath + '/public'
            , compile: compile
        }
    ));

    //Any request comes in, will find the same filename file in public dir
    app.use(express.static(config.rootPath + '/public'));
};