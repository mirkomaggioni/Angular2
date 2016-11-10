import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Attachment } from "../models/attachment";
import { WebApi } from "./webapi";

@Injectable()
export class AttachmentService extends WebApi<Attachment>  {
    constructor(public http: Http) {
        super("/api/attachments", http);
    }
}