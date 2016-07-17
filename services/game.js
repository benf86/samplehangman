'use strict';

module.exports = globals => {
    let gameRepository = globals.repositories.game;
    return {
        get (where) {
            return gameRepository.get(where);
        },

        create () {
            return gameRepository.create();
        },

        update (uuid, data) {
            return gameRepository.update(uuid, data);
        }
    };
};
