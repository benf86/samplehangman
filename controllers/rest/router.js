'use strict';

module.exports = globals => {
    var routes = require('./v1')(globals);
    routes.forEach(route => {
        globals.router[route.verb](
            route.path,

            // Authorization middleware
            function authorize (req, res, next) {
                // Invoke authorization middleware here
                next();
            },

            // Input data sanitization middleware
            function sanitize (req, res, next) {
                // Invoke sanitization middleware here
                next();
            },

            // Request handler
            function handleRequest (req, res, next) {
                route.handler(req)
                .then(r => {
                    res.status(200).json(r);
                })
                .catch(e => {
                    next(e);
                });
            }
        );
    });
};
