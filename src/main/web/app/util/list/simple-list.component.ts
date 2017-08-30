import {Component, Input, Output, EventEmitter} from '@angular/core';
import {UtilMethods} from "../util-methods.service";


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
                font-size: 100%;
              }`],
    providers: [UtilMethods]
})
export class SimpleListComponent {
    constructor(private utilMethods: UtilMethods) {
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

    /**
     * checks wether item contains comma -> it can make problems
     * in he future with decoding string with commas
     */
    private containsComma = false;

    /**
     * measure type (l, ml, g, kg...)
     */
    private measure = '';

    /**
     * quantity of product
     */
    private quantity = 0;

    /**
     * adds item to list and emits an event with list
     */
    addItem() {
        //if not specified do not show and also trim whitespaces
        this.currentItem = this.currentItem.replace(/\s\s+/g, '');
        this.currentItem = this.utilMethods.stringToUpperCase(this.currentItem);
        //check if item contains comma
        if (this.currentItem.indexOf(',') > -1){
            this.containsComma = true;
            return;
        }

        //combine a string
        if(this.isMeasureAndQuantityProvided())
            this.currentItem = this.currentItem + ' ' + this.quantity + ' ' + this.measure;

        //if item isnt empty, add it
        if (this.currentItem) {
            this.listItems.push(this.currentItem);
            this.currentItem = '';
            this.eventClick.emit(this.listItems);
            this.containsComma = false;
        }
        this.measure = '';
        this.quantity = 0;
    }

    /**
     * checks is quantity and mesure values can be added to string
     */
    private isMeasureAndQuantityProvided() {
        //quant cant be null
        //measure cant be null
        //quan cant be 0
        //measure cant be empty
        return (this.quantity && this.measure) && (this.quantity > 0 && this.measure != '');
    }

    /**
     *
     * deletes item
     */
    deleteItem(index:number) {
        if (index > -1) {
            this.listItems.splice(index, 1);
        }
    }

}
