import { Component, Input, Output } from "@angular/core";
import * as moment from "moment";

@Component({
    selector: "date-picker",
    templateUrl: "/app/views/datePicker.html"
})

export class DatePickerComponent {
    currentDate: string;
    @Input() placeholder: string;
    @Input() name: string;
    @Input() validationEnabled: boolean;

    @Input()
    set value (date: Date) {
        if (date != undefined) {
            this.currentDate = moment(date).format("DD/MM/YYYY");
        } 
    }
}