import { Pipe, PipeTransform } from "@angular/core";
import { SelectOption } from "../models/selectOption";

@Pipe({ name: "optionLabel" })

export class OptionLabelPipe implements PipeTransform {
    transform(options: SelectOption[], value: string): string {
        let label: string = "";

        if (options != undefined && value != undefined) {
            options.forEach(option => {
                if (option.value == value) {
                    label = option.label;
                }
            });
        }

        return label;
    }
}