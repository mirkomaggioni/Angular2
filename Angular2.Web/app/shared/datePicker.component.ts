import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
import { Constants } from "./commons";

@Component({
    moduleId: module.id,
    selector: "date-picker",
    templateUrl: "datePicker.component.html"
})

export class DatePickerComponent {
    @Input() placeholder: string;
    @Input() name: string;
    @Input() validationEnabled: boolean;
    @Output() onSelected = new EventEmitter<string>();
    public currentDate: Date;
    public formattedCurrentDate: string = "";
    public showDatePicker: boolean = false;

    @Input()
    set value (date: Date) {
        if (date != undefined) {
            this.currentDate = date;
            this.formattedCurrentDate = moment(this.currentDate).format(Constants.dateFormat);
        } 
    }

    public ShowDatePicker() {
        this.showDatePicker = true;
    }

    public HideDatePicker() {
        this.showDatePicker = false;
        this.formattedCurrentDate = moment(this.currentDate).format(Constants.dateFormat);
        this.onSelected.emit(moment(this.currentDate).format(Constants.momentDateFormat));
    }
}