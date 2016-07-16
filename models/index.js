'use strict';

module.exports = globals => {
    globals.models = globals.models || {};
    globals.utils.loadDirectory(__dirname, globals.models, globals);
    return globals.models;
};
