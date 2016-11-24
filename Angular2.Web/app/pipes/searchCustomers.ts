import { Pipe, PipeTransform } from "@angular/core";
import { Customer } from "../models/customer";

@Pipe({ name: "searchCustomers" })

export class SearchCustomersPipe implements PipeTransform {
    transform(customers: Customer[], searchText: string): Customer[] {
        let filteredCustomers: Customer[] = new Array<Customer>();

        if (customers != undefined) {
            customers.forEach(customer => {
                if ((customer.Name.indexOf(searchText) != -1) || (customer.Address.indexOf(searchText) != -1)) {
                    filteredCustomers.push(customer);
                }
            });
        }

        return filteredCustomers;
    }
}