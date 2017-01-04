import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { City } from "./city.model";
import { WebApi } from "../shared/webapi";
import { AlertService } from "../core/alert.service";

@Injectable()
export class CityService extends WebApi<City>  {
    constructor(public http: Http, public alertService: AlertService) {
        super("/api/cities", http);
    }

    public Search(query: string): Observable<City[]> {  
        return this.http.get(this.url + "?query=" + query, this.options).map(this.extractData).catch(this.handleError);
    };
}