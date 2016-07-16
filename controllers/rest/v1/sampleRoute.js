'use strict';

module.exports = function sampleRouteInitializer (globals) {
    return [
        {
            description: 'Sample route',
            path: '/sampleRoute',
            verb: 'get',
            permissions: 'sampleRoute.get',
            sanitizer: 'sampleRoute.get',
            handlerArguments: {
                'msg': {
                    type: 'string',
                    description: 'JSON data'
                }
            },
            handler (req) {
                return globals.services.sampleService.get(req.query);
            }
        }
    ];
};
