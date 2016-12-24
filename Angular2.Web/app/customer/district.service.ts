import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { District } from "./district.model";
import { WebApi } from "../shared/webapi";
import { AlertService } from "../core/alert.service";

@Injectable()
export class DistrictService extends WebApi<District>  {
    constructor(public http: Http, public alertService: AlertService) {
        super("/api/districts", http);
    }
}