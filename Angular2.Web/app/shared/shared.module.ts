import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { ModalModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';

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