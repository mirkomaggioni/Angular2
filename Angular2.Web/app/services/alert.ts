import { Injectable } from "@angular/core";
import { ToastsManager} from "ng2-toastr";

@Injectable()
export class AlertService {

    constructor (public manager: ToastsManager) {}

    public Info(message: string) {
        this.manager.info(message);
    }

    public Error(message: string) {
        this.manager.error(message);
    }

    public Warning(message: string) {
        this.manager.warning(message);
    }

    public Success(message: string) {
        this.manager.success(message);
    }
}