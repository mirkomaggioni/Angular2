import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { SharedModule } from "../shared/shared.module";
import { CityComponent } from "./city.component";
import { CityDetailComponent } from "./city.detail.component";
import { CityNamePipe } from "./cityName.pipe";
import { CityService } from "./city.service";
import { DistrictService } from "./district.service";

@NgModule ({
    imports: [
        HttpModule,
        SharedModule
    ],
    exports: [
        CityComponent,
        CityNamePipe
    ],
    declarations: [
        CityComponent,
        CityDetailComponent,
        CityNamePipe
    ],
    providers: [
        CityService,
        DistrictService
    ]
})

export class CityModule {}
