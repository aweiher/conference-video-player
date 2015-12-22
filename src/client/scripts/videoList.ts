import {IVideo, IVideoService} from "./interfaces";
import {Component, View, NgZone} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {VideoService} from "./videoService";

@Component({
    selector: 'video-list',
    viewProviders: [HTTP_PROVIDERS],
    providers: [VideoService],
    templateUrl: '/templates/videoList.html'
})
export class VideoList {
    videos: IVideo[];

    constructor(public videoService: VideoService) {
        this.videos = [];
        this.loadVideos();
    }

    updateVideos() {
        this.loadVideos();
    }

    loadVideos() {
        this.videoService.getAll().subscribe( videos => {
            this.videos.length = 0;
            videos.forEach((video) => {
                this.videos.push(video);
            });
        });
    }
}