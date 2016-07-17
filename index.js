'use strict';

var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var db = require('knex')(config.get('database'));

db.migrate.latest()
.then(() => {

var globals = {
    utils: require('./utils')(globals),
    router,
    db
};

require('./models')(globals);
require('./repositories')(globals);
require('./services')(globals);

// Load infrastructure middlewares
router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
router.use(bodyParser.json({ limit: '50mb' }));

// Load router
require('./controllers/rest/router')(globals);
app.use(router);

// Blastoff!
console.log('Server listening on port ' + config.infrastructure.port);
app.listen(config.infrastructure.port);

});
