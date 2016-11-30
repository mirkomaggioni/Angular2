import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

export class NgbDateMomentParserFormatter extends NgbDateParserFormatter {
    constructor(private dateFormat: string) {
        super();
    }

    format(date: NgbDateStruct) {
        if (date == null) {
            return "";
        }

        let momentDate = moment(date);
        return momentDate.isValid ? momentDate.format(this.dateFormat) : "";
    }

    parse(value: string) {
        if (value == null) {
            return null;
        }

        let momentDate = moment(value, this.dateFormat);
        return momentDate.isValid ? { year: momentDate.year(), month: momentDate.month(), day: momentDate.day() } : null;
    }
}
