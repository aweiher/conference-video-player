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
    method: "GET",
    path: "/api/channels",
    handler: (req, reply) => {

        fs.readdir(`${dataPath}/channels/`, (err, items) => {
            reply(items.map(
                (fileName) => JSON.parse(fs.readFileSync(`${dataPath}/channels/${fileName}`).toString())
            ));
        });

        //let filePath = `${dataPath}/channels/${req.params['channel_id']}.json`;
        //
        //if(!fs.existsSync(filePath)) {
        //    return reply(Boom.notFound("Channel does not exists"));
        //}
        //
        //fs.readFile(filePath, (err, buf) => {
        //    if(err) {
        //        console.error('unexpected error: ', err);
        //        return reply(Boom.badImplementation("any error"));
        //    }
        //
        //    reply(buf.toString());
        //})
    }
});

server.route({
    method: "GET",
    path: "/api/channels/{channel_id}",
    handler: (req, reply) => {
        let filePath = `${dataPath}/channels/${req.params['channel_id']}.json`;

        if(!fs.existsSync(filePath)) {
            return reply(Boom.notFound("Channel does not exists"));
        }

        fs.readFile(filePath, (err, buf) => {
            if(err) {
                console.error('unexpected error: ', err);
                return reply(Boom.badImplementation("any error"));
            }

            reply(buf.toString());
        })
    }
});

server.route({
    method: 'GET',
    path: '/api/videos',
    handler: (req, reply) => {
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

server.start(() => {
    console.log(`Server running at ${server.info.uri}`)
});
