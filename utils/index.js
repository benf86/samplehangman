'use strict';

var fs = require('fs');

module.exports = globals => {
    return {
        loadDirectory (directory, parentObject) {
            parentObject = parentObject || {};
            fs.readdirSync(directory)
            .filter(e => e !== 'index.js')
            .forEach(e => {
                parentObject[e] = require(`${directory}/${e}`)(globals);
            });
            return parentObject;
        }
    };
};
