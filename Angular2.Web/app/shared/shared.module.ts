import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { ModalModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

import "rxjs/add/observable/throw";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";

@NgModule ({
    imports: [
        FormsModule,
        CommonModule,
        ModalModule.forRoot(),
        DatepickerModule.forRoot(),
        
    ],
    exports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        ModalModule,
        DatepickerModule
    ]
})

export class SharedModule {}