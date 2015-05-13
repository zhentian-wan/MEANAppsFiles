/**
 * Created by Answer1215 on 5/11/2015.
 */
var auth = require('./auth');

module.exports = function(app){
    //Set route for partials
    //When request comes for main partials, it will look for server/views/partials/mian
    app.get('/partials/*', function(req,res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.auth);

    // All routes handled by this route, give client side to handle
    app.get('*', function(req,res) {
        res.render('index');
    });
}