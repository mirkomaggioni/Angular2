import { NgModule, ModuleWithProviders, Optional, SkipSelf } from "@angular/core";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { SearchService } from "./search.service";
import { AlertService } from "./alert.service";

@NgModule ({
  imports: [
    ToastModule.forRoot()
  ]
})

export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        SearchService,
        ToastModule,
        AlertService
      ]
    };
  }
}