import {IVideo, IVideoService, IChannel} from "../../interfaces";
import {Component, View, NgZone} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {VideoService} from "../../services/videoService";



@Component({
    selector: 'video-list',
    viewProviders: [HTTP_PROVIDERS],
    template: require('./videoList.jade')()
})
export class VideoList {
    channels: IChannel[] = [];

    constructor() {
    }

}
