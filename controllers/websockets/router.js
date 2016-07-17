'use strict';

module.exports = globals => {
    globals.app.ws('/ws', handleWsRequest);

    function handleWsRequest(ws, req) {
        console.log('INCOMING CONNECTION');
        ws.send(JSON.stringify({
            status: 200,
            message: 'Welcome to the game management stream'
        }));

        ws.on('message', function (msg) {
           if (msg === 'gibGames') updateGames(ws);
        });

        globals.ee.on('games.update', function () {
            updateGames(ws);
        });
    }

    function updateGames (ws) {
        globals.services.game.getAll()
        .then(games => {
            ws.send(JSON.stringify(games.map(game => game.toObject())));
        });
    }
};
