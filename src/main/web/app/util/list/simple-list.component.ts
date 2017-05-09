import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


/**
 * This component can be injected into a form
 * @returns a list of items specified in this component
 */
@Component({
    selector: 'simple-list',
    templateUrl: 'app/util/list/simple-list.component.html',
    styles: [`.label{
                display: inline-block;
                margin: 1px;
              }`]
})
export class SimpleListComponent implements OnInit {
    constructor() {
    }

    /**
     * provided label name
     */
    @Input() label:string;
    /**
     * sends an items list
     */
    @Output() eventClick = new EventEmitter();
    /**
     * list of items
     */
    private listItems:string[] = [];
    /**
     * current item in input
     */
    private currentItem = '';

    ngOnInit() {
    }

    /**
     * adds item to list and emits an event with list
     */
    addItem() {
        //if not specified do not show and also trim whitespaces
        this.currentItem = this.currentItem.replace(/\s\s+/g, ' ');
        if (this.currentItem !== '') {
            this.listItems.push(this.currentItem);
            this.currentItem = '';
            this.eventClick.emit(this.listItems);
        }
    }

    deleteItem(index:number) {
        if (index > -1) {
            this.listItems.splice(index, 1);
        }
    }

}
