import {HTTP_PROVIDERS} from 'angular2/http';
import {VideoList} from '../videoList/videoList.ts';
import {Component} from "angular2/core";
import {ConferenceList} from "../conferenceList/index";

var data = require('../../../data/data.json');

@Component({
    selector: 'dev-conference-videos-app',
    template: require('./appTemplate.jade')(),
    directives: [ConferenceList],
    viewProviders: [HTTP_PROVIDERS]
})
export class AppComponent {
    data;
    constructor() {
        this.data = data;
    }
}

