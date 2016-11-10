import { Injectable } from "@angular/core";
import { ToastsManager, ToastOptions } from "ng2-toastr";

@Injectable()
export class AlertService {

    constructor (public manager: ToastsManager, public options: ToastOptions ) {
        options.autoDismiss = true;
        
    }

    public Info(message: string) {
        this.manager.info(message, null, this.options);
    }

    public Error(message: string) {
        this.manager.error(message, null, this.options);
    }

    public Warning(message: string) {
        this.manager.warning(message, null, this.options);
    }

    public Success(message: string) {
        this.manager.success(message, null, this.options);
    }
}