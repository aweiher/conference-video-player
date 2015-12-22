import "reflect-metadata";
import "es6-shim";
import  "angular2/bundles/angular2-polyfills.js";
import 'rxjs';

//import "zone.js";
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import {VideoService} from './videoService';
import {VideoRestService} from './videoRestService';

import {VideoList} from './videoList.ts';

import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'dev-conference-videos-app',
    templateUrl: '/templates/appTemplate.html',
    directives: [VideoList],
    viewProviders: [HTTP_PROVIDERS]
})
class AppComponent {
    constructor() {
    }
}

bootstrap(AppComponent, [VideoService, VideoRestService, HTTP_PROVIDERS]);

