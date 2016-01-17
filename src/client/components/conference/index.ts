import {Component, EventEmitter, Input, Output} from "angular2/core";
import {IConference} from '../../interfaces';

@Component({
    selector: 'conference',
    template: require('./template.jade')()
})
export class Conference {
    @Input() conference : IConference;
    @Output() onItemSelected = new EventEmitter<IConference>()

    constructor() {
    }

    onClick() {
        this.onItemSelected.emit(this.conference);
    }
}

