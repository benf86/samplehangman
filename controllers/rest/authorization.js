'use strict';

module.exports = function authorize (req, res, next) {
    // Invoke authorization middleware here
    next();
};
