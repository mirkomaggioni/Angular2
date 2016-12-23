import { Pipe, PipeTransform } from "@angular/core";
import { Invoice } from "./invoice.model";

@Pipe({ 
    name: "searchInvoices",
    pure: false 
})

export class SearchInvoicesPipe implements PipeTransform {
    transform(invoices: Invoice[], searchText: string): Invoice[] {
        let filteredInvoices: Invoice[] = new Array<Invoice>();

        if (invoices != undefined) {
            invoices.forEach(invoice => {
                if ((invoice.Number.toString().indexOf(searchText) != -1) || (invoice.Year.toString().indexOf(searchText) != -1)) {
                    filteredInvoices.push(invoice);
                }
            });
        }

        return filteredInvoices;
    }
}