import { Component, Input, ElementRef } from "@angular/core";
import { Constants } from "../commons";
import { Attachment } from "../models/attachment";
import { AttachmentService } from "../services/attachment";
import { FileBlobService } from "../services/fileblob";
import { AlertService } from "../services/alert";

@Component({
    selector: "attachment",
    templateUrl: "/app/views/attachment.html"
})

export class AttachmentComponent {
    @Input() placeholder: string;
    @Input() name: string;
    @Input() validationEnabled: boolean;
    @Input() attachment: Attachment;
    public fileBlob: FileList;

    constructor (public elementRef: ElementRef, public attachmentService: AttachmentService, public fileBlobService: FileBlobService, public alertService: AlertService) {}

    public AddAttachment() {
        let attachment = this.elementRef.nativeElement.firstElementChild;
        if (attachment.files.length > 0) {
            let file:FileList = attachment.files[0];
            this.fileBlobService.Post(file).subscribe(
                (res) => {
                    this.attachment = {
                        Id: Constants.guidEmpty,
                        IdFileBlob: res.toString(),
                        Name: file.item.name,
                        Size: file.item.length
                    };
                },
                (error) => this.alertService.Error(error));
        }
    }
}