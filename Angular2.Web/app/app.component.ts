import { Component, ViewContainerRef } from "@angular/core";
import { TranslateService } from "ng2-translate";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "app.component.html"
})

export class AppComponent {
    private viewContainerRef: ViewContainerRef;

    constructor (translateService: TranslateService, viewContainerRef:ViewContainerRef) {
        translateService.setDefaultLang("en");
        translateService.use("en");
        this.viewContainerRef = viewContainerRef;
    }
}