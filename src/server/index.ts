import Hapi = require('hapi');
import path = require('path');
import fs = require('fs');
import Boom = require('boom');

let server = new Hapi.Server(''),
    basePath = path.join(__dirname, '../../dist/client'),
    dataPath = path.join(__dirname, '../../src/data');;

server.connection({port: 3000});
server.register(require('inert'), function () {});

server.route({
    method: 'GET',
    path: '/data',
    handler: (req, reply) => {
        let data = require('../../src/data/data.json');
        reply(data);
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

server.start(() => {
    console.log(`Server running at ${server.info.uri}`)
});
