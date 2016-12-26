import { Pipe, PipeTransform } from "@angular/core";
import { City } from "./city.model";

@Pipe({ 
    name: "cityName",
    pure: false 
})

export class CityNamePipe implements PipeTransform {
    transform(cities: City[], id: string): string {
        let name = "";

        if (cities != undefined) {
            var city = cities.find(c => c.Id == id);
            name = city.Name;
        }

        return name;
    }
}