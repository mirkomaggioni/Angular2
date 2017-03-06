import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { AlertService } from "./core/alert.service";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "app.component.html"
})

export class AppComponent {
    public onLoading: boolean = true;
    private viewContainerRef: ViewContainerRef;

    constructor (translateService: TranslateService, viewContainerRef:ViewContainerRef, private alertService: AlertService) {
        translateService.setDefaultLang("en");
        translateService.use("en");
        this.viewContainerRef = viewContainerRef;
        this.alertService.SetViewContainerRef(this.viewContainerRef);
    }

    ngOnInit() {
        this.alertService.onLoading.subscribe((onLoading: boolean) => {
           this.onLoading = onLoading;
        });
    }
}