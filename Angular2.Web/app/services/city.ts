import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { City } from "../models/city";
import { WebApi } from "./webapi";

@Injectable()
export class CityService extends WebApi<City>  {
    constructor(public http: Http) {
        super("/api/cities", http);
    }
}