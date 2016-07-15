'use strict';

const BaseModel = require('./BaseModel');

var SampleModel = function SampleModel () {};

SampleModel.create = function (params) {
    return BaseModel.create(SampleModel, params);
};

module.exports = SampleModel;
