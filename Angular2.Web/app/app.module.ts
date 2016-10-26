import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
// import { ToastModule } from "ng2-toastr/ng2-toastr";

import { AppComponent } from "../app/app.component";
import { CustomersComponent } from "../app/components/customers";
import { InvoicesComponent } from "../app/components/invoices";

@NgModule ({
    imports: [ 
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            { 
                path: "",
                redirectTo: "invoices",
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
        HttpModule
        // ,
        // ToastModule
    ],
    declarations: [
        AppComponent,
        CustomersComponent,
        InvoicesComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
