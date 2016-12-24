import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { SharedModule } from "../shared/shared.module";
import { AttachmentModule } from "../attachment/attachment.module";
import { InvoiceComponent } from "./invoice.component";
import { InvoiceDetailComponent } from "./invoice.detail.component";
import { SearchInvoicesPipe } from "./searchInvoices.pipe";
import { InvoiceService } from "./invoice.service";
import { CustomerService } from "../customer/customer.service";
import { DatePickerComponent } from "../shared/datePicker.component";

@NgModule ({
    imports: [ 
        HttpModule,
        SharedModule,
        AttachmentModule,
        RouterModule.forChild([
        {
            path: "",
            component: InvoiceComponent
        }])
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        InvoiceComponent,
        InvoiceDetailComponent,
        SearchInvoicesPipe,
        DatePickerComponent
    ],
    providers: [
        InvoiceService,
        CustomerService
    ]
})

export class InvoiceModule {}
