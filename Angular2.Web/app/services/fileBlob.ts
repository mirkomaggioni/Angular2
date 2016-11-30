import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { WebApi } from "./webapi";

@Injectable()
export class FileBlobService extends WebApi<FileList> {
    constructor(public http: Http) {
        super("/api/fileBlobs", http);
    }
}