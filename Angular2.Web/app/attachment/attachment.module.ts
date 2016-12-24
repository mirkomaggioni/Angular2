import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/toPromise";

import { SharedModule } from "../shared/shared.module";
import { AttachmentComponent } from "./attachment.component";
import { AttachmentService } from "./attachment.service";
import { FileBlobService } from "./fileBlob.service";

let options: any = {
  autoDismiss: true,
  positionClass: 'toast-bottom-right',
};

@NgModule ({
    imports: [
        SharedModule,
        HttpModule
    ],
    exports: [
        AttachmentComponent
    ],
    declarations: [
        AttachmentComponent
    ],
    providers: [
        AttachmentService,
        FileBlobService
    ]
})

export class AttachmentModule {}


