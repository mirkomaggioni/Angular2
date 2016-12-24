import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Constants } from "../shared/commons";
import { Attachment } from "./attachment.model";
import { FileBlobService } from "./fileBlob.service";
import { AlertService } from "../core/alert.service";

@Component({
    moduleId: module.id,
    selector: "attachment",
    templateUrl: "attachment.component.html"
})

export class AttachmentComponent {
    @Input() placeholder: string;
    @Input() name: string;
    @Input() validationEnabled: boolean;
    @Input() attachment: Attachment;
    @Output() onSaved = new EventEmitter<Attachment>();
    public fileBlob: File;

    constructor (private fileBlobService: FileBlobService, private alertService: AlertService) {}

    public DownloadAttachment() {
        this.fileBlobService.DownloadFile(this.attachment.IdFileBlob);
    }

    public AddAttachment(event) {
        let attachments = event.target.files;
        if (attachments.length > 0) {
            let file:File = attachments[0];
            this.fileBlobService.PostFile(file).subscribe(
                (res) => {
                    let id: string = Constants.guidEmpty;

                    if (this.attachment != null)
                        id = this.attachment.Id;

                    this.attachment = {
                        Id: id,
                        IdFileBlob: res.toString(),
                        Name: file.name,
                        Size: file.size
                    };

                    this.onSaved.emit(this.attachment);
                },
                (error) => this.alertService.Error(error));
        }
    }

    public UploadNewAttachment() {
        this.attachment.IdFileBlob = null;
    }

    public AttachmentIsNull() {
        return (this.attachment == null) || (this.attachment.IdFileBlob == null);
    }
}