'use strict';

module.exports = globals => {
    globals.services = globals.services || {};
    globals.utils.loadDirectory(__dirname, globals.services, globals);
    return globals.services;
};
