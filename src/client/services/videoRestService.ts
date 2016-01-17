import {Injectable} from 'angular2/core';
import {Http, Request, RequestMethod} from 'angular2/http';
import 'rxjs/operator/map';
import {IVideo} from "../interfaces";

@Injectable()
export class VideoRestService {
    constructor(public http:Http) {}

    getAll() {
        return this.http.get('/data'); 
    }
}
