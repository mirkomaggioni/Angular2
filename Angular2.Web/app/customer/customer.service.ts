import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Customer } from "./customer.model";
import { WebApi } from "../shared/webapi";

@Injectable()
export class CustomerService extends WebApi<Customer>  {
    constructor(public http: Http) {
        super("/api/customers", http);
    }
}