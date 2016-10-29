import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

export class WebApi<T> {
    protected url: string;
    private options: RequestOptions;

    constructor(url: string, public http: Http) {
        this.url = url;
        let headers = new Headers({ "Content-Type": "application/json" });
        this.options = new RequestOptions({ headers: headers });
    }

    protected GetAll(): Observable<T[]> {
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    };

    protected Get(id: string): Observable<T> {
        return this.http.get(this.url + "/" + id, this.options).map(this.extractData).catch(this.handleError);
    }

    protected Put(id: string, entity: T): Observable<boolean> {
        return this.http.put(this.url + "/" + id, JSON.stringify(entity), this.options).map(this.extractData).catch(this.handleError);        
    }

    protected Post(entity: T): Observable<T> {
        return this.http.post(this.url, JSON.stringify(entity), this.options).map(this.extractData).catch(this.handleError);
    }

    protected Delete(id: string): Observable<boolean> {
        return this.http.delete(this.url + "/" + id, this.options).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}