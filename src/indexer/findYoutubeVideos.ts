import RequestPromise = require("request-promise");
var config = require('../config.json');

import rp = require("request-promise");
import fs = require('fs');
import path = require('path')

var dataPath = path.resolve(__dirname, '../../src/data');

class Video {
    id: string;
    title: string;
    description: string;
    thumbnail: Thumbnail;

    constructor(public id, public title, public description, public thumbnail) {

    }

}

class Thumbnail {
    url:string;
    width:number;
    height:number;

    constructor(public url, public width, public height) {

    }
}

class Playlist {
    id:string;
    title:string;
    description:string;
    thumbnail:Thumbnail;

    videos:Video[];

    constructor(public id:string,
                public title:string,
                public description:string,
                public thumbnail:Thumbnail) {
        this.loadItems().then((videos) => {
            this.videos = videos;
        });
    }

    private loadItems():RequestPromise {
        return YoutubeApi.search("playlistItems", {
                part: "id,snippet",
                playlistId: this.id
            })
            .then((res) => res.items)
            .then((items) => items.map((item) => {
                let thumbnail = item.snippet.thumbnails.default;
                return new Video(
                    item.snippet.resourceId.videoId,
                    item.snippet.title,
                    item.snippet.description,
                    new Thumbnail(thumbnail.url, thumbnail.width, thumbnail.height)
                );
            }));
    }
}

class Channel {
    id:string;
    name:string;
    playlists:Playlist[];

    constructor(public name:string) {
        this.loadDetails()
            .then(() => this.loadPlaylists())
            .then(() => this.serializeToFile())
            .catch((err) => {
                console.error('cant get data for:', this.name, err);
            });
    }

    serializeToFile() {
        fs.writeFile(`${dataPath}/channels/${this.id}.json`, JSON.stringify({
            id: this.id,
            name: this.name
        }));
    }

    loadDetails() {
        return YoutubeApi.search('channels', {
            part: 'id',
            forUsername: this.name,
        }).then(
            (details) => {
                if (!details.items || !details.items[0]) {
                    throw new Error("channel does not exists");
                }

                this.id = details.items[0].id;
            }
        );
    }


    loadPlaylists() {
        return YoutubeApi.search('playlists', {
            part: 'snippet',
            channelId: this.id,
        }).then((playlistResponse) => {
            return playlistResponse.items.map(
                (item) => {
                    let
                        playlistItem = item.snippet,
                        thumbnail = playlistItem.thumbnails.default;

                    return new Playlist(
                        item.id,
                        playlistItem.title,
                        playlistItem.description,
                        new Thumbnail(thumbnail.url, thumbnail.width, thumbnail.height)
                    );
                }
            )
        }).then((playlists) => {
            this.playlists = playlists;
        });
    }
}

class YoutubeApi {

    static search(section, options) {
        options.key = config.youtube.api_key;

        let query = Object.keys(options).map((key) => {
                return key + '=' + options[key];
            }
            ).join('&'),
            url = `https://www.googleapis.com/youtube/v3/${section}?${query}`;

        return rp.get({
            uri: url,
            json: true
        });
    }
}

var channels:Channel[];

channels = [
    new Channel("GotoConferences"),
    new Channel("jsconfeu"),
    new Channel("haskljdfhasdfopuz4387904"),
];


// fetch playlists


// fetch videos


