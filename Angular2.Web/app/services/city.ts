import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { City } from "../models/city";
import { WebApi } from "./webapi";
import { AlertService } from "../services/alert";

@Injectable()
export class CityService extends WebApi<City>  {
    constructor(public http: Http, public alertService: AlertService) {
        super("/api/cities", http);
    }
}