import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { Invoice } from "../models/invoice";
import { SelectOption } from "../models/selectOption";
import { AlertService } from "../services/alert";
import { InvoiceService } from "../services/invoice";

@Component({
    selector: "invoices-detail",
    templateUrl: "/app/views/invoices.detail.html"
})

export class InvoicesDetailCumponent {
    @Input() isNew: boolean;
    @Input() validationEnabled: boolean;
    @Input() customerOptions: SelectOption[];
    @Output() onClosed = new EventEmitter<Invoice>();
    @Output() onDeleted = new EventEmitter<Invoice>();
    private currentInvoice: Invoice;
    private originalInvoice: Invoice;

    @Input() 
    set invoice (invoice: Invoice) {
        this.currentInvoice = invoice;
        this.backupInvoice(this.currentInvoice);
    }

    get invoice () { 
        return this.currentInvoice;
    }

    constructor(public invoiceService: InvoiceService, public alertService: AlertService, public translateService: TranslateService) { }

    public Save() {
        if (this.isNew) {
            this.invoiceService.Post(this.invoice).subscribe(
                (data) => {
                    this.invoice = data;

                    this.translateService.get("INVOICESLOADED").subscribe((res: string) => { 
                        this.alertService.Success(res);
                    });
                },
                (error) => this.alertService.Error(error));
        }
        else {
            this.invoiceService.Put(this.invoice.Id, this.invoice).subscribe(
                (data) => {
                    this.backupInvoice(this.invoice);
                    this.translateService.get("INVOICESAVED").subscribe((res: string) => { 
                        this.alertService.Success(res);
                    });
                },
                (error) => this.alertService.Error(error));
        }
    }

    private backupInvoice(invoice: Invoice) {
        this.originalInvoice = {
            Id: invoice.Id,
            IdCustomer: invoice.IdCustomer,
            IdAttachment: invoice.IdAttachment,
            Number: invoice.Number,
            Year: invoice.Year,
            EmissionDate: invoice.EmissionDate,
            DueDate: invoice.DueDate,
            PaymentDate: invoice.PaymentDate
        }
    }

    private restoreCustomer() {
        this.currentInvoice.Id = this.originalInvoice.Id;
        this.currentInvoice.IdCustomer = this.originalInvoice.IdCustomer;
        this.currentInvoice.IdAttachment = this.originalInvoice.IdAttachment;
        this.currentInvoice.Number = this.originalInvoice.Number;
        this.currentInvoice.Year = this.originalInvoice.Year;
        this.currentInvoice.EmissionDate = this.originalInvoice.EmissionDate;
        this.currentInvoice.DueDate = this.originalInvoice.DueDate;
        this.currentInvoice.PaymentDate = this.originalInvoice.PaymentDate;
    }
}

