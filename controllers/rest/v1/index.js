'use strict';

module.exports = globals => {
    globals.routes = globals.routes || {};
    globals.routes.rest = [];
    var routes = globals.utils.loadDirectory(__dirname);
    for (let route in routes) {
        console.log(routes[route]);
        globals.routes.rest = globals.routes.rest.concat(routes[route]);
    }

    return globals.routes.rest;
};
