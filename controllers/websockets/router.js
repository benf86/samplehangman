'use strict';

const uuid = require('uuid');

module.exports = globals => {
    globals.app.ws('/ws', handleWsRequest);
    globals.wsClients = { clients: {} };

    function handleWsRequest(ws, req) {
        ws.uuid = uuid.v4();
        globals.wsClients.clients[ws.uuid] = ws;

        console.log('INCOMING CONNECTION', ws.uuid);
        ws.send(JSON.stringify({
            status: 200,
            message: 'Welcome to the game management stream'
        }));
        updateGames(ws);

        ws.onclose = function () {
            delete globals.wsClients.clients[ws.uuid];
            console.log('CLOSED CONNECTION', ws.uuid);
        };
    }

    function updateGames (ws) {
        globals.services.game.getAll()
        .then(games => {
            ws.send(JSON.stringify(games.map(game => game.toObject())));
        })
        .catch(e => {
            if (e.code == 404) {
                ws.send(JSON.stringify({
                    status: 200,
                    message: 'You are connected but there are no games in the database'
                }));
            }
        });
    }

    globals.wsClients.notifyAll = function notifyAll () {
        Object.keys(globals.wsClients.clients).forEach(id => {
            let client = globals.wsClients.clients[id];
            console.log('NOTIFYING', client.uuid);
            updateGames(client);
        });
    };
};
