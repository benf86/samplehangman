'use strict';

var fs = require('fs');

module.exports = () => {
    return {
        loadDirectory (directory, parentObject, globals) {
            parentObject = parentObject || {};
            fs.readdirSync(directory)
            .filter(e => e !== 'index.js')
            .forEach(e => {
                parentObject[e.slice(0, e.length-3)] = require(`${directory}/${e}`)(globals);
            });
            return parentObject;
        }
    };
};
