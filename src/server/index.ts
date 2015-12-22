import Hapi = require('hapi');

import path = require('path');

let server = new Hapi.Server(''),
    basePath = path.join(__dirname, '../../dist/client'),
    jspmPath = path.join(__dirname, '../../dist/jspm_packages');

server.connection({port: 3000});
server.register(require('inert'), function () {});

server.route({
    method: 'GET',
    path: '/api/videos',
    handler: function(req, reply) {
        reply([{
            url: "moep"
        }, {
            url: "miep"
        }]);
    }
});

server.route({
    method: 'GET',
    path: '/{p*}',
    handler: {
        directory: {
            path: basePath,
            redirectToSlash: true,
            index: true
        }
    }
});


server.route({
    method: 'GET',
    path: '/jspm_packages/{p*}',
    handler: {
        directory: {
            path: jspmPath,
            redirectToSlash: true,
            index: true
        }
    }
});

server.start(() => {
    console.log(`Server running at ${server.info.uri}`)
});
