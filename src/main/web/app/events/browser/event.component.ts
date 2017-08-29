import {Component, OnInit, Input} from '@angular/core';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {LoginService} from "../../login/login.service";

//TODO: dodaj te klasy ;) pousuwaj zbędne service
@Component({
    selector: 'event-detail',
    templateUrl: 'app/events/browser/event.component.html',
    directives: [ToasterContainerComponent]
})
export class EventGeneralComponent implements OnInit {
    constructor(private loginService: LoginService) {
    }

    //event from all event list component
    @Input() private event: any;

    private eventType: string;

    //configure toaster container
    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit() {
        this.switchTypeToNames();
    }

    /**
     * extracts event name from event type int
     */
    switchTypeToNames() {
        switch (this.event.type) {
            case 1:
                this.eventType = "Dołącz do uczty";
                break;
            case 2:
                this.eventType = "Ugotujmy coś razem";
                break;
        }
    }
}
