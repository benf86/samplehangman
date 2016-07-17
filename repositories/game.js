'use strict';


module.exports = globals => {
    let GameModel = globals.models.Game;
    let ErrorModel = globals.models.ErrorModel;
    return {
        get (where) {
            return globals.db('games')
            .where(where)
            .limit(1)
            .then(gameModels => {
                let gameModel = gameModels[0];
                if (!gameModel) throw ErrorModel.notFound('Game with this uuid not found');
                gameModel.game_data = JSON.parse(gameModel.game_data);
                return GameModel.create(gameModel);
            });
        },

        getAll () {
            return globals.db('games')
            .where('id', '>', 0)
            .then(gameModels => {
                if (gameModels.length === 0) throw ErrorModel.notFound('No games found in the system');

                return gameModels.map(gameModel => {
                    gameModel.game_data = JSON.parse(gameModel.game_data);
                    return GameModel.create(gameModel);
                });
            });
        },

        create () {
            return this.store(GameModel.create());
        },

        update (uuid, data) {
            return this.get({ uuid })
            .then(oldDbModel => {
                return GameModel.create(oldDbModel.toObject());}
            )
            .then(oldModel => {
                return oldModel.update(data);
            })
            .tap(newModel => this.store(newModel));
        },

        store (gameModel) {
            let modelId = gameModel.get('id');
            delete gameModel.data.id;
            gameModel.data.game_data = JSON.stringify(gameModel.data.game_data);

            if (!modelId) {
                return globals.db('games')
                .insert(gameModel.toObject())
                .then(() => parseGameData(gameModel))
                .tap(() => {
                    globals.ee.emit('games.update');
                });
            }

            return globals.db('games')
            .where({ id: modelId })
            .update(gameModel.toObject())
            .then(() => parseGameData(gameModel))
            .tap(() => {
                globals.ee.emit('games.update');
            });
        }
    };
};

function parseGameData (gameModel) {
    gameModel.data.game_data = JSON.parse(gameModel.data.game_data);
    return gameModel;
}
