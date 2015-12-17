import {IVideo, IVideoService} from "./interfaces";
import {Component} from 'angular2/core';
import {VideoService} from './videoService.ts';

@Component({
    selector: 'video-list',
    templateUrl: '/templates/videoList.html',
    providers: [VideoService]
})
export class VideoList {
    videos: IVideo[];

    constructor(videoService: VideoService) {
        this.videos = videoService.getAll();
    }

}