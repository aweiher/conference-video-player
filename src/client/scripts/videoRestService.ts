import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod} from 'angular2/http';

@Injectable()
export class VideoRestService {
    constructor(public http:Http) {}

    getAll() {
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: '/api/videos'
        }));
    }
}
