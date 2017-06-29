import {IMyDpOptions} from "mydatepicker/index";

export class DatePickerValues{

    dateNow: Date;
    maxBirthYear: number;
    minBirthYear: number;
    maxBirthDate: Date;
    myDatePickerOptions: IMyDpOptions;
    defaultYearAndMonth: string;

    constructor(){
        this.dateNow = new Date();
        this.maxBirthYear = this.dateNow.getFullYear()-16;
        this.minBirthYear = this.dateNow.getFullYear()-105;
        this.maxBirthDate = new Date(this.dateNow.setFullYear(this.maxBirthYear));
    }

    //in profile
    initializeDatePicker(){
        this.myDatePickerOptions = {
            // other options...
            minYear: <number> this.minBirthYear,
            maxYear: <number> this.maxBirthYear,
            indicateInvalidDate: true,
            showTodayBtn: false,
            openSelectorTopOfInput: true,
            markCurrentYear: false,
            allowDeselectDate: true,
            disableSince: {year: this.maxBirthDate.getFullYear(), month: this.maxBirthDate.getMonth()+1, day: this.maxBirthDate.getDate()+1}
        };
        this.defaultYearAndMonth = this.maxBirthDate.getFullYear()+"-"+(this.maxBirthDate.getMonth()+1);
    }

    //in events
    initializeDatePickerForEvents(){
        this.myDatePickerOptions = {
            indicateInvalidDate: true,
            showTodayBtn: false,
            openSelectorTopOfInput: false,
            markCurrentYear: false,
            allowDeselectDate: true,
            disableSince: {year: this.dateNow.getFullYear()+2, month: this.dateNow.getMonth()+1, day: this.dateNow.getDate()+1}
        };
        this.defaultYearAndMonth = this.dateNow.getFullYear()+"-"+(this.dateNow.getMonth()+1);
    }

    addDisableUntil(){
        this.myDatePickerOptions.disableUntil = {year: this.dateNow.getFullYear(), month: this.dateNow.getMonth()+1, day: this.dateNow.getDate()-1};
    }
}