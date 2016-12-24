import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from "@angular/http";

import { SharedModule } from "../shared/shared.module";
import { CustomerComponent } from "./customer.component";
import { CustomerDetailComponent } from "./customer.detail.component";
import { CityDetailComponent } from "./city.detail.component";
import { CityNamePipe } from "./cityName.pipe";
import { SearchCustomersPipe } from "./searchCustomers.pipe";
import { CityService } from "./city.service";
import { CustomerService } from "./customer.service";
import { DistrictService } from "./district.service";

@NgModule ({
    imports: [
        HttpModule,
        SharedModule,
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
        CityDetailComponent,
        CityNamePipe,
        SearchCustomersPipe
    ],
    providers: [
        CityService,
        DistrictService,
        CustomerService
    ]
})

export class CustomerModule {}
