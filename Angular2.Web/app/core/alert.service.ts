import { Injectable, Input, Output, EventEmitter } from "@angular/core";
import { ToastsManager} from "ng2-toastr";

@Injectable()
export class AlertService {
    private _isLoading: boolean = true;

    constructor (public manager: ToastsManager) {}

    @Input()
    set isLoading(isLoading) {
        this._isLoading = isLoading;
        this.onLoading.emit(this._isLoading);
    }

    @Output() onLoading = new EventEmitter<boolean>();

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