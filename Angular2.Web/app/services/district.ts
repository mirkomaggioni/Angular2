import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { District } from "../models/district";
import { WebApi } from "./webapi";
import { AlertService } from "../services/alert";

@Injectable()
export class DistrictService extends WebApi<District>  {
    constructor(public http: Http, public alertService: AlertService) {
        super("/api/districts", http);
    }
}