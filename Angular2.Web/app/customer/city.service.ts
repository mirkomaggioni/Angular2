import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { City } from "./city.model";
import { WebApi } from "../shared/webapi";
import { AlertService } from "../core/alert.service";

@Injectable()
export class CityService extends WebApi<City>  {
    constructor(public http: Http, public alertService: AlertService) {
        super("/api/cities", http);
    }
}