'use strict';

module.exports = function sanitize (req, res, next) {
    // Invoke input sanitization middleware here
    next();
};
