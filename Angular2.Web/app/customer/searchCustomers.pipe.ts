import { Pipe, PipeTransform } from "@angular/core";
import { Customer } from "./customer.model";

@Pipe({ 
    name: "searchCustomers",
    pure: false 
})

export class SearchCustomersPipe implements PipeTransform {
    transform(customers: Customer[], searchText: string): Customer[] {
        let filteredCustomers: Customer[] = new Array<Customer>();

        if (customers != undefined) {
            filteredCustomers = customers.filter(c => (c.Name.indexOf(searchText) != -1) || (c.Address.indexOf(searchText) != -1));
        }

        return filteredCustomers;
    }
}