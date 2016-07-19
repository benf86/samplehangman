'use strict';

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var expressWs = require('express-ws')(app);
var routerREST = express.Router();
var db = require('knex')(config.get('database'));

db.migrate.latest()
.then(() => {

var globals = {
    utils: require('./utils')(globals),
    router: routerREST,
    db: db,
    app: app
};

require('./models')(globals);
require('./repositories')(globals);
require('./services')(globals);

// Load infrastructure middlewares
routerREST.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
routerREST.use(bodyParser.json({ limit: '50mb' }));

// Load routers
app.use(require('cors')());
require('./controllers/rest/router')(globals);
app.use('/rest', routerREST);
require('./controllers/websockets/router')(globals);


// Blastoff!
console.log('Server listening on port ' + config.infrastructure.port);
app.listen(config.infrastructure.port);

});
