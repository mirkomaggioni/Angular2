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
            filteredInvoices = invoices.filter(i => (i.Number.toString().indexOf(searchText) != -1) || (i.Year.toString().indexOf(searchText) != -1));
        }

        return filteredInvoices;
    }
}