'use strict';

const _ = require('lodash');


var BaseModel = function BaseModel () {};

/*  Model creator function
*       params: new model properties
*       ops: function that modifies/checks/validates/... params
*   returns new model
*/
BaseModel.create = function create (Model, params, ops) {
    if (typeof ops === 'function') {
        params = ops(params);
        if (!params) throw new Error('Your operations function is supposed to return parsed params object!');
    }

    var newModel = _.extend(new Model(), {
        data: params,
        created_at: Date.now(),
        modified_at: Date.now(),
        dirty: false
    });
    _.extend(newModel.__proto__, BaseModel.prototype);

    try {
        Object.keys(newModel.data).forEach(key => {

            // Set getters and setters for original model properties
            Object.defineProperty(newModel, key, {
                get () {
                    return this.data[key];
                },
                set (value) {
                    this.dirty = true;
                    this.data[key] = value;
                    this.modified_at = Date.now();
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
    return this.data[property];
};

BaseModel.prototype.set = function set (property, value) {
    this.dirty = true;
    this.modified_at = Date.now();
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

BaseModel.prototype.isDirty = function isDirty () {
    return this.dirty;
};

BaseModel.prototype.getLastModified = function getLastModified () {
    return new Date(this.modified_at);
};

BaseModel.prototype.getCreatedAt = function getCreatedAt () {
    return new Date(this.created_at);
};

module.exports = BaseModel;
