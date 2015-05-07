/**
 * Created by Answer1215 on 5/5/2015.
 */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = new express();

//compile stylus
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
}

// Set view page path
app.set('views', __dirname + '/server/views');
// Set jade
app.set('view engine', 'jade');

//loggin
app.use(logger('dev'));

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Use stylus
app.use('/css',stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
));

//Any request comes in, will find the same filename file in public dir
app.use(express.static(__dirname + '/public'));

//Set route for partials
app.get('/partials/:partialPath', function(req,res) {
    res.render('partials/' + req.params.partialPath); //When request comes for main partials, it will look for server/views/partials/mian
});

// All routes handled by this route, give client side to handle
app.get('/', function(req,res) {
    res.render('index');
});

var port = 3030;
app.listen(port);

console.log("Server is listening at " + port);

