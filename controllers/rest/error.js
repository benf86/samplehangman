'use strict';

module.exports = function errorMidleware (err, req, res, next) {
    res.status(err.code).json(err.toObject());
};
