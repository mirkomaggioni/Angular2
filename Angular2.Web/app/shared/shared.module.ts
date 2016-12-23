import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { ModalModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { TranslateModule } from "ng2-translate";
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";

import { AlertService } from "./alert.service";
import { DatePickerComponent } from "./datePicker.component";

let options: any = {
  autoDismiss: true,
  positionClass: 'toast-bottom-right',
};

@NgModule ({
    imports: [
        FormsModule,
        CommonModule,
        TranslateModule.forRoot(),

        ModalModule.forRoot(),
        DatepickerModule.forRoot(),
        ToastModule.forRoot(options)
    ],
    exports: [
        FormsModule,
        CommonModule,
        ModalModule,
        DatepickerModule,
        TranslateModule,
        DatePickerComponent
    ],
    providers: [
        ToastModule,
        AlertService
    ],
    declarations: [
        DatePickerComponent
    ]
})

export class SharedModule {}