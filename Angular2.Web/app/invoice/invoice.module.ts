import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";

import { SharedModule } from "../shared/shared.module";
import { AttachmentModule } from "../attachment/attachment.module";
import { InvoiceComponent } from "./invoice.component";
import { InvoiceDetailComponent } from "./invoice.detail.component";
import { SearchInvoicesPipe } from "./searchInvoices.pipe";
import { InvoiceService } from "./invoice.service";

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
        SearchInvoicesPipe
    ],
    providers: [
        InvoiceService
    ]
})

export class InvoiceModule {}
