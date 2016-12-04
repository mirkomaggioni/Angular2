import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { WebApi } from "./webapi";

@Injectable()
export class FileBlobService extends WebApi<File> {
    constructor(public http: Http) {
        super("/api/fileBlobs", http);
    }

    public Post(entity: File): Observable<File> {
        let formData = new FormData();
        formData.append(entity.name, entity);

        return this.http.post(this.url, formData).map(super.extractData).catch(this.handleError);
    }
}