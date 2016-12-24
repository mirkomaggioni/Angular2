import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "ng2-translate";
import { ModalModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";
import { AlertService } from "./alert.service";

let options: any = {
  autoDismiss: true,
  positionClass: 'toast-bottom-right',
};

@NgModule ({
    imports: [
        FormsModule,
        CommonModule,
        ModalModule.forRoot(),
        DatepickerModule.forRoot(),
        ToastModule.forRoot(options)
    ],
    exports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        ModalModule,
        DatepickerModule
    ],
    providers: [
        ToastModule,
        AlertService
    ]
})

export class SharedModule {}