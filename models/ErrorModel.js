'use strict';

const BaseModel = require('./BaseModel')();

var ErrorModel = function ErrorModel () {};

ErrorModel.serverError = function (message, code) {
    let params = {
        message: message || 'Server has encountered an error',
        code: code || 500
    };
    return BaseModel.create(ErrorModel, params);
};

module.exports = () => ErrorModel;
