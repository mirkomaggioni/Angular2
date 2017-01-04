import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { SharedModule } from "../shared/shared.module";
import { CityModule } from "../city/city.module";
import { CustomerComponent } from "./customer.component";
import { CustomerDetailComponent } from "./customer.detail.component";
import { SearchCustomersPipe } from "./searchCustomers.pipe";
import { CustomerService } from "./customer.service";

@NgModule ({
    imports: [
        HttpModule,
        SharedModule,
        CityModule,
        RouterModule.forChild([
        {
            path: "",
            component: CustomerComponent
        }])
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        CustomerComponent,
        CustomerDetailComponent,
        SearchCustomersPipe
    ],
    providers: [
        CustomerService
    ]
})

export class CustomerModule {}
