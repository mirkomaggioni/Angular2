import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Constants } from "../commons";
import { TranslateService } from "ng2-translate";
import { Attachment } from "../models/attachment";
import { Invoice } from "../models/invoice";
import { SelectOption } from "../models/selectOption";
import { AlertService } from "../services/alert";
import { AttachmentService } from "../services/attachment";
import { InvoiceService } from "../services/invoice";

@Component({
    selector: "invoices-detail",
    templateUrl: "/app/views/invoices.detail.html"
})

export class InvoicesDetailComponent {
    @Input() isNew: boolean;
    @Input() validationEnabled: boolean;
    @Input() customerOptions: SelectOption[];
    @Output() onClosed = new EventEmitter<Invoice>();
    @Output() onDeleted = new EventEmitter<Invoice>();
    public attachment: Attachment;
    private currentInvoice: Invoice;
    private originalInvoice: Invoice;

    @Input()
    set invoice(invoice: Invoice) {
        this.currentInvoice = invoice;
        this.backupInvoice(this.currentInvoice);

        if (this.invoice.IdAttachment != "") {
            this.attachmentService.Get(this.invoice.IdAttachment).subscribe(
                (res: Attachment) => {
                    this.attachment = res;
                },
                (error) => this.alertService.Error(error));
        }
        else {
            this.attachment = null;
        }
    }

    get invoice() {
        return this.currentInvoice;
    }

    constructor(public invoiceService: InvoiceService, public attachmentService: AttachmentService, public alertService: AlertService, public translateService: TranslateService) { }

    public Save() {
        if (this.isNew) {

            this.attachmentService.Post(this.attachment).subscribe(
                (attachment) => {
                    this.attachment = attachment;
                    this.invoice.IdAttachment = this.attachment.Id;

                    this.invoiceService.Post(this.invoice).subscribe(
                        (invoice) => {
                            this.invoice = invoice;

                            this.translateService.get("INVOICESAVED").subscribe((res: string) => {
                                this.alertService.Success(res);
                            });
                        },
                        (error) => this.alertService.Error(error));
                },
                (error) => this.alertService.Error(error));
        }
        else {
            this.attachmentService.Put(this.attachment.Id, this.attachment).subscribe(
                (attachment) => {
                    this.invoiceService.Put(this.invoice.Id, this.invoice).subscribe(
                        (Invoice) => {
                            this.backupInvoice(this.invoice);
                            this.translateService.get("INVOICESAVED").subscribe((res: string) => {
                                this.alertService.Success(res);
                            });
                        },
                        (error) => this.alertService.Error(error));
                },
                (error) => this.alertService.Error(error));
        }
    }

    public Close() {
        this.restoreInvoice();
        this.onClosed.emit(this.invoice);
    }

    public Delete() {
        this.invoiceService.Delete(this.invoice.Id).subscribe(
            (res) => {
                this.attachmentService.Delete(this.attachment.Id).subscribe(
                    (res) => {
                        this.translateService.get("INVOICEDELETED").subscribe((res: string) => {
                            this.alertService.Success(res);
                        });
                        this.onDeleted.emit(this.invoice);
                    },
                    (error) => this.alertService.Error(error));
            },
            (error) => this.alertService.Error(error));
    }

    public onAttachmentSaved(attachment: Attachment) {
        this.attachment = attachment;
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

    private restoreInvoice() {
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

