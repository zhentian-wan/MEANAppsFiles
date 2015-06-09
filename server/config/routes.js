var usersBlock = require('../routes/Users'),
    skillsBlock = require('../routes/Skills'),
    auth = require('./auth');

module.exports = function(app, config) {

    /*
     * User route
     * */
    app.use('/api/users', usersBlock);

    /*
     * Skill route
     * */
    app.use('/api/skills', skillsBlock);


   /* app.get('/api/lang', function(req, res) {
        // Check endpoint called with appropriate param.:
        if(!req.query.lang) {
            res.status(500).send();
            return;
        }

        try {
            var lang = require('../i18n/' + req.query.lang);
            res.send(lang); // `lang ` contains parsed JSON
        } catch(err) {
            res.status(404).send();
        }
    });*/


    //Set route for partials
    //When request comes for main partials, it will look for server/views/partials/mian
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.auth);

    app.post('/logout', function(req, res) {
        req.logout(); //added by passport
        res.end();
    });

    //handle all the error request
    app.all('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    // All routes handled by this route, give client side to handle
    app.get('*', function(req, res) {
        var langFile = config.rootPath + 'public/app/i18n/i18n.json',
            wordsFile = config.rootPath + 'public/app/i18n/words.json';
        res.render('index', {
            bootstrappedUser: req.user //server will remember the current user
        });
    });
};

