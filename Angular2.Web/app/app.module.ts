import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "ng2-translate";
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";

import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";

import { AppComponent } from "../app/app.component";
import { CustomersComponent } from "../app/components/customers";
import { InvoicesComponent } from "../app/components/invoices";
import { AlertService } from "../app/services/alert";
import { AttachmentService } from "../app/services/attachment";
import { CityService } from "../app/services/city";
import { CustomerService } from "../app/services/customer";
import { InvoiceService } from "../app/services/invoice";

let options: any = {
  autoDismiss: true,
  positionClass: 'toast-bottom-right',
};

@NgModule ({
    imports: [ 
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            { 
                path: "",
                redirectTo: "customers",
                pathMatch: "full" 
            },
            { 
                path: "customers",
                component: CustomersComponent  
            },
            { 
                path: "invoices",
                component: InvoicesComponent
            }
        ]),
        TranslateModule.forRoot(),
        HttpModule,
        ToastModule.forRoot(options)
    ],
    exports: [
        TranslateModule
    ],
    declarations: [
        AppComponent,
        CustomersComponent,
        InvoicesComponent
    ],
    providers: [
        ToastModule,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AlertService,
        AttachmentService,
        CityService,
        CustomerService,
        InvoiceService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
