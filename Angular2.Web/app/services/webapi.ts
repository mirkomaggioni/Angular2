import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

export class WebApi<T> {
    protected url: string;
    private options: RequestOptions;

    constructor(url: string, public http: Http) {
        this.url = url;
        let headers = new Headers({ "Content-Type": "application/json" });
        this.options = new RequestOptions({ headers: headers });
    }

    public GetAll(): Observable<T[]> {  
        return this.http.get(this.url, this.options).map(this.extractData).catch(this.handleError);
    };

    public Get(id: string): Observable<T> {
        return this.http.get(this.url + "/" + id, this.options).map(this.extractData).catch(this.handleError);
    }

    public Put(id: string, entity: T): Observable<boolean> {
        return this.http.put(this.url + "/" + id, JSON.stringify(entity), this.options).map(this.extractResponseStatus).catch(this.handleError);        
    }

    public Post(entity: T): Observable<T> {
        return this.http.post(this.url, JSON.stringify(entity), this.options).map(this.extractData).catch(this.handleError);
    }

    public Delete(id: string): Observable<boolean> {
        return this.http.delete(this.url + "/" + id, this.options).map(this.extractResponseStatus).catch(this.handleError);
    }

    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    protected handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractResponseStatus(res: Response) {
        return res.ok;
    }
}