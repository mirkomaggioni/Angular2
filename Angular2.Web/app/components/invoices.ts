import { Component, OnInit } from "@angular/core";
import { Customer } from "../models/customer";
import { Invoice } from "../models/invoice";
import { Constants } from "../commons";
import { SelectOption } from "../models/selectOption";
import { AlertService } from "../services/alert";
import { CustomerService } from "../services/customer";
import { InvoiceService } from "../services/invoice";
import { SearchService } from "../services/search";

@Component({
    selector: "invoices",
    templateUrl: "/app/views/invoices.html"
})

export class InvoicesComponent implements OnInit {
    public customers: Customer[];
    public invoices: Invoice[];
    public invoice: Invoice;
    public edit = false;
    public newInvoice = false;
    public invoiceValidationEnabled = true;
    public invoiceOptions: SelectOption[];

    constructor(public invoiceService: InvoiceService, public customerService: CustomerService, public alertService: AlertService, public searchService: SearchService) {}

    ngOnInit() {
        this.searchService.searchText = "";
        this.Load();
        this.getCustomers();
    }

    public Load() {
        this.invoiceService.GetAll().subscribe(
            (data) => {
                this.invoices = data;
                this.alertService.Success("Invoices loaded successfully");
            },
            (error) => this.alertService.Error(error));
    }

    public New() {
        let newInvoice: Invoice = {
            Id: Constants.guidEmpty,
            IdAttachment: Constants.guidEmpty,
            IdCustomer: Constants.guidEmpty,
            EmissionDate: new Date(),
            DueDate: new Date()
        };

        this.invoice = newInvoice;
        this.newInvoice = true;
        this.invoiceValidationEnabled = true;
        this.edit = true;
    }

    public Edit(invoice: Invoice) {
        this.invoice = invoice;
        this.newInvoice = false;
        this.invoiceValidationEnabled = true;
        this.edit = true;
    }

    onClosed(invoice: Invoice) {
        if (invoice.Id != Constants.guidEmpty) {
            this.invoice = invoice;

            if (this.newInvoice) {
                this.invoices.push(this.invoice);
            }
        }

        this.invoiceValidationEnabled = false;
        this.edit = false;
    }

    onDeleted(invoice: Invoice) {
        this.invoices.splice(this.invoices.indexOf(this.invoice), 1);
        this.edit = false;
    }

    private getCustomers() {
        this.invoiceOptions = new Array<SelectOption>();

        this.customerService.GetAll().subscribe(
            (data: Customer[]) => {
                data.forEach(customer => {
                    this.invoiceOptions.push(new SelectOption(customer.Name, customer.Id));
                });
            },
            (error) => this.alertService.Error(error));
    }
}