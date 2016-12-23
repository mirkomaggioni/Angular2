import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Attachment } from "./attachment.model";
import { WebApi } from "../shared/webapi";

@Injectable()
export class AttachmentService extends WebApi<Attachment>  {
    constructor(public http: Http) {
        super("/api/attachments", http);
    }
}