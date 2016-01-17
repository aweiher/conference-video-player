import {Component} from "angular2/core";
import {IConference} from "../../interfaces";
import {Input} from "angular2/core";
import {Conference} from '../conference/index';

@Component({
    selector: 'conference-list',
    template: require('./template.jade')(),

    inputs: ['conferences'],
    directives: [Conference]
})
export class ConferenceList {
    @Input() conferences: IConference;

    ngOnInit() {
        console.log('LOAD CONFERENCES !!:', this.conferences)
    }

    onConferenceSelected(event) {
        console.log('Conference Selected:', event);
    }
}
