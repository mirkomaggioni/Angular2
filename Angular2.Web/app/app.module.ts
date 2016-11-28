import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "ng2-translate";
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";
import { SelectModule } from "angular2-select";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";

import { AppComponent } from "../app/app.component";
import { HeaderComponent } from "../app/components/header";
import { CustomersComponent } from "../app/components/customers";
import { CustomersDetailComponent } from "../app/components/customers.detail";
import { InvoicesComponent } from "../app/components/invoices";
import { InvoicesDetailComponent } from "../app/components/invoices.detail";
import { DatePickerComponent } from "../app/components/datePicker";
import { OptionLabelPipe } from "../app/pipes/optionLabel";
import { SearchCustomersPipe } from "../app/pipes/searchCustomers";
import { SearchInvoicesPipe } from "../app/pipes/searchInvoices";
import { AlertService } from "../app/services/alert";
import { AttachmentService } from "../app/services/attachment";
import { CityService } from "../app/services/city";
import { CustomerService } from "../app/services/customer";
import { InvoiceService } from "../app/services/invoice";
import { SearchService } from "../app/services/search";

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
        ToastModule.forRoot(options),
        SelectModule,
        NgbModule.forRoot()
    ],
    exports: [
        TranslateModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        CustomersComponent,
        CustomersDetailComponent,
        InvoicesComponent,
        InvoicesDetailComponent,
        DatePickerComponent,
        OptionLabelPipe,
        SearchCustomersPipe,
        SearchInvoicesPipe
    ],
    providers: [
        ToastModule,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AlertService,
        AttachmentService,
        CityService,
        CustomerService,
        InvoiceService,
        SearchService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
