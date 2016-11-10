import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Invoice } from "../models/invoice";
import { WebApi } from "./webapi";

@Injectable()
export class InvoiceService extends WebApi<Invoice>  {
    constructor(public http: Http) {
        super("/api/invoices", http);
    }
}