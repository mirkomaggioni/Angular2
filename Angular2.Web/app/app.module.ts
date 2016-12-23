import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "../app/app.component";
import { HeaderComponent } from "./header.component";

@NgModule ({
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot([
        { 
            path: "",
            redirectTo: "customers",
            pathMatch: "full" 
        },
        { 
            path: "customers",
            loadChildren: "app/customer/customer.module#CustomerModule"
        },
        { 
            path: "invoices",
            loadChildren: "app/invoice/invoice.module#InvoiceModule"
        }
    ])],
    exports: [
        RouterModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
