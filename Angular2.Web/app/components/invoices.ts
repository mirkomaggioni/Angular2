import { Component, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { Invoice } from "../models/invoice";
import { Constants } from "../commons";
import { AlertService } from "../services/alert";
import { InvoiceService } from "../services/invoice";
import { SearchService } from "../services/search";

@Component({
    selector: "invoices",
    templateUrl: "/app/views/invoices.html"
})

export class InvoicesComponent implements OnInit {
    public invoices: Invoice[];
    public invoice: Invoice;
    public edit = false;
    public newInvoice = false;
    public invoiceValidationEnabled = true;

    constructor(public invoiceService: InvoiceService, public alertService: AlertService, public searchService: SearchService, public translateService: TranslateService) { }

    ngOnInit() {
        this.searchService.searchText = "";
        this.Load();
    }

    public Load() {
        this.invoiceService.GetAll().subscribe(
            (data) => {
                this.invoices = data;
                this.invoice = null;
                this.translateService.get("INVOICESLOADED").subscribe((res: string) => {
                    this.alertService.Success(res);
                });
            },
            (error) => this.alertService.Error(error));
    }

    public New() {
        let newInvoice: Invoice = {
            Id: Constants.guidEmpty,
            IdAttachment: "",
            IdCustomer: "",
            Year: (new Date()).getFullYear(),
            EmissionDate: new Date(),
            DueDate: new Date(),
            Customer: null
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
        this.invoice = invoice;
        this.invoiceValidationEnabled = false;
        this.edit = false;

        this.Load();
    }

    onDeleted(invoice: Invoice) {
        this.invoices.splice(this.invoices.indexOf(this.invoice), 1);
        this.edit = false;
    }
}