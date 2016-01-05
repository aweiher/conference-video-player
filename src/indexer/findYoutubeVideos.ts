import bluebird = require('bluebird');
import RequestPromise = require("request-promise");
var config = require('../config.json');

import rp = require("request-promise");
import fs = require('fs');
import path = require('path')

var dataPath = path.resolve(__dirname, '../../src/data');

class Video {
    thumbnail: Thumbnail;

    constructor(public id, public title, public description, thumbnail: Thumbnail) {
        //this.thumbnail = thumbnail;
    }
}

class Thumbnail {

    constructor(public url, public width, public height) {

    }
}

class Playlist {

    videos: Video[];

    constructor(public id: string,
        public title: string,
        public description: string,
        public thumbnail: Thumbnail) {

    }

    fetch(): Promise<any> {
        return this.loadItems().then((videos) => {
            this.videos = videos;
            return this;
        });
    }

    private loadItems(): RequestPromise {
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
    id: string;
    title: string;
    thumbnail: Thumbnail;
    description: string;
    playlists: Playlist[];
    videos: Video[];

    constructor(public name?: string, public channelId?: string) {

    }

    fetch(): Promise<any> {
        return this.loadDetails()
            .then(() => {
                return this.name ? this.loadPlaylists() : this.loadVideos();
            })
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
        let options = this.name ? {
            part: 'id,snippet',
            forUsername: this.name,
        } : {
            part: 'id,snippet',
            id: this.channelId,
        }
        
        return YoutubeApi.search('channels', options).then(
            (details) => {
                if (!details.items || !details.items[0]) {
                    throw new Error("channel does not exists");
                }
                
                let snippet = details.items[0].snippet;
                let thumbnail = snippet.thumbnails.default;
                
                console.log('Channel Details!', details.items[0].snippet);

                this.id = details.items[0].id;
                this.title = snippet.title;
                this.thumbnail = new Thumbnail(thumbnail.url, thumbnail.width, thumbnail.height)
                this.description = snippet.description;
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

                    let playlist = new Playlist(
                        item.id,
                        playlistItem.title,
                        playlistItem.description,
                        new Thumbnail(thumbnail.url, thumbnail.width, thumbnail.height)
                    );

                    return playlist.fetch();
                }
            )
        }).then((playlists) => {
            return bluebird.all(playlists);
        }).then((playlists) => {
            this.playlists = playlists;
            return this;
        });
    }

    loadVideos() {
        return YoutubeApi.search('search', {
            part: 'id,snippet',
            channelId: this.channelId,
        }).then((res) => res.items)
            .then((items) => items.map((item) => {
                let thumbnail = item.snippet.thumbnails.default;
                
                return new Video(
                    item.id.videoId,
                    item.snippet.title,
                    item.snippet.description,
                    new Thumbnail(thumbnail.url, thumbnail.width, thumbnail.height)
                );
            }))
            .then( videos => {
                this.videos = videos;
                return this; 
            });
    }

    serialize(): string {
        return JSON.stringify(this);
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

var channels: Channel[];

channels = [
    new Channel("GotoConferences"),
    new Channel("jsconfeu"),
    new Channel(undefined, "UC-WICcSW1k3HsScuXxDrp0w"), // Curry On!
    new Channel("OreillyMedia"),
    new Channel("CCCdeVideos")
    //new Channel("haskljdfhasdfopuz4387904"),
];

bluebird.all(
    channels.map(
        //channel => channel.fetch().then(channel => console.log('channel:', channel))
        channel => channel.fetch()
    )
).then(
    data => fs.writeFile(`${dataPath}/data.json`, JSON.stringify(data)) 
);

// fetch playlists


// fetch videos


