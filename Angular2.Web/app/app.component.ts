import { Component } from "@angular/core";
import { TranslateService } from "ng2-translate";

@Component({
    selector: "app",
    templateUrl: "/app/views/app.html"
})

export class AppComponent {
    constructor (translateService: TranslateService) {
        translateService.setDefaultLang("en");
        translateService.use("en");
    }
}