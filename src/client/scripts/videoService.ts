import {Injectable} from 'angular2/core';
import {IVideo, IVideoService} from "./interfaces";
import {VideoRestService} from "./videoRestService";

@Injectable()
export class VideoService implements IVideoService {
    private videos: IVideo[];

    constructor (public restService: VideoRestService) {
    };

    fetchAll() {
        return this.restService.getAll().subscribe((videos:IVideo[]) => {
            this.videos = videos;
        });
    }

    getAll() {
        return this.videos;
    }
}