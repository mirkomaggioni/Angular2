import { Component, Input } from "@angular/core";
import { Constants } from "../commons";
import { Attachment } from "../models/attachment";
import { FileBlobService } from "../services/fileBlob";
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
    public fileBlob: File;

    constructor (public fileBlobService: FileBlobService, public alertService: AlertService) {}

    public LoadAttachment() {
        this.fileBlobService.DownloadFile(this.attachment.IdFileBlob);
    }

    public AddAttachment(event) {
        let attachments = event.target.files;
        if (attachments.length > 0) {
            let file:File = attachments[0];
            this.fileBlobService.PostFile(file).subscribe(
                (res) => {
                    this.attachment = {
                        Id: Constants.guidEmpty,
                        IdFileBlob: res.toString(),
                        Name: file.name,
                        Size: file.size
                    };
                },
                (error) => this.alertService.Error(error));
        }
    }
}