import {Injectable} from 'angular2/core';
import {IVideo, IVideoService} from "../interfaces";
import {VideoRestService} from "./videoRestService";
import {Response} from 'angular2/http';

@Injectable()
export class VideoService implements IVideoService{
    constructor (public restService: VideoRestService) { };

    getAll() {
        return this.restService
            .getAll()
            .map( res => res.json())
    }
}