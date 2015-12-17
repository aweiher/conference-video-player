import "reflect-metadata";
//import "zone.js";
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import {VideoService} from './videoService';
import {VideoRestService} from './videoRestService';

import {VideoList} from './videoList.ts';

import {Http} from 'angular2/http';

@Component({
    selector: 'dev-conference-videos-app',
    templateUrl: '/templates/appTemplate.html',
    directives: [VideoList],
    providers: [Http]
})
class AppComponent {}

bootstrap(AppComponent, [VideoService, VideoRestService]);

