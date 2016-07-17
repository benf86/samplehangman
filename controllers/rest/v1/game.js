'use strict';

module.exports = function gameRouteInitializer (globals) {
    return [
        {
            description: 'get a game\'s data',
            path: '/games/:uuid',
            verb: 'get',
            permissions: 'game.get',
            sanitizer: 'game.get',
            handlerArguments: {
                'req': {
                    type: 'request object',
                    description: 'express request object'
                }
            },
            handler (req) {
                return globals.services.game.get(req.params);
            }
        },
        {
            description: 'get a new game',
            path: '/games/',
            verb: 'post',
            permissions: 'game.post',
            sanitizer: 'game.post',
            handlerArguments: {
                'req': {
                    type: 'request object',
                    description: 'express request object'
                }
            },
            handler (req) {
                return globals.services.game.create();
            }
        },
        {
            description: 'update an existing game state',
            path: '/games/:uuid',
            verb: 'put',
            permissions: 'game.put',
            sanitizer: 'game.put',
            handlerArguments: {
                'req': {
                    type: 'request object',
                    description: 'express request object'
                }
            },
            handler (req) {
                return globals.services.game.update(req.params.uuid, req.body);
            }
        }
    ];
};
