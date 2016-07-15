'use strict';

const _ = require('lodash');


var BaseModel = function BaseModel () {
    this.data = {};
    this.created_at = new Date();
    this.modified_at = new Date();
    this.last_accessed = null;
    this.dirty = false;
};

/*  Model creator function
*       params: new model properties
*       ops: function that modifies/checks/validates/... params
*   returns new model
*/
BaseModel.create = function create (params, ops) {
    if (typeof ops === 'function') {
        params = ops(params);
        if (!params) throw new Error('Your operations function is supposed to return parsed params object!');
    }

    var newModel = new BaseModel();
    newModel.data = params;
    try {
        Object.keys(newModel.data).forEach(key => {

            // Set getters and setters for original model properties
            Object.defineProperty(newModel, key, {
                get () {
                    this.last_accessed = new Date();
                    return this.data[key];
                },
                set (value) {
                    this.last_accessed = new Date();
                    this.dirty = true;
                    this.data[key] = value;
                },
                enumerable: false,
                configurable: true
            });
        });
    } catch (e) {
        throw e;
    }
    return newModel;
};

BaseModel.prototype.get = function get (property) {
    this.last_accessed = new Date();
    return this.data[property];
};

BaseModel.prototype.set = function set (property, value) {
    this.last_accessed = new Date();
    this.dirty = true;
    this.data[property] = value;
};

BaseModel.prototype.toJSON = function toJSON (replacer, space) {
    replacer = replacer || null;
    space = space || null;
    return JSON.stringify(this.data, replacer, space);
};

BaseModel.prototype.toString = function toString (replacer, space) {
    replacer = replacer || null;
    space = space || null;
    return JSON.stringify(_.assign({}, this), replacer, space);
};

module.exports = BaseModel;
