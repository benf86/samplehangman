'use strict';

module.exports = globals => {
    globals.repositories = globals.repositories || {};
    globals.utils.loadDirectory(__dirname, globals.repositories, globals);
    return globals.repositories;
};
