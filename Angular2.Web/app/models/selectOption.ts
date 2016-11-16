import { City } from "./city";

export class SelectOption {
    value: string;
    label: string;

    constructor(city: City) {
        this.value = city.Id;
        this.label = city.Name;
    }
}
