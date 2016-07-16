'use strict';

module.exports = globals => {
    let sampleRepository = globals.repositories.sampleRepository;
    return {
        get (where) {
            return sampleRepository.get(where);
        }
    };
};
