var express = require('express'),
    app = new express(),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, config);


app.listen(config.port, function() {
    console.log("Server is listening at " + config.port);
});



