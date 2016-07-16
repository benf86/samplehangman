'use strict';

var Promise = require('bluebird');

module.exports = globals => {
    let SampleModel = globals.models.SampleModel;
    let ErrorModel = globals.models.ErrorModel;
    return {
        get (where) {
            if (where.fail) {
                return Promise.reject(ErrorModel.serverError());
            }
            return Promise.resolve(SampleModel.create({
                message: `Sample message: ${JSON.stringify(where)}`
            }));
        }
    };
};
