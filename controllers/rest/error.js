'use strict';

module.exports = function errorMidleware (err, req, res, next) {
    if (err instanceof Error) {
        res.status(500).json({
            status: 500,
            message: 'Server has experienced an error'
        });
    }
    res.status(err.code).json(err.toObject());
};
