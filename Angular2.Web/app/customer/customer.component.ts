import { Component, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";

import { SharedModule } from "../shared/shared.module";
import { Customer } from "./customer.model";
import { Constants } from "../shared/commons";  
import { AlertService } from "../core/alert.service";
import { CustomerService } from "./customer.service";
import { SearchService } from "../core/search.service";

@Component({
    moduleId: module.id,
    selector: "customer",
    templateUrl: "customer.component.html"
})

export class CustomerComponent implements OnInit {
    public customers: Customer[];
    public customer: Customer;
    public edit = false;
    public newCustomer = false;
    public customerValidationEnabled = true;

    constructor(private customerService: CustomerService, private alertService: AlertService, private searchService: SearchService, private translateService: TranslateService) {}

    ngOnInit() {
        this.searchService.searchText = "";
        this.Load();
    }

    public Load() {
        this.alertService.isLoading = true;

        this.customerService.GetAll().subscribe(
            (data) => {
                this.alertService.isLoading = false;
                this.customers = data;
                this.customer = null;
                this.translateService.get("CUSTOMERSLOADED").subscribe((res: string) => {
                    this.alertService.Success(res);
                });
            },
            (error) => this.alertService.Error(error));
    }

    public New() {
        let newCustomer: Customer = {
            Id: Constants.guidEmpty,
            IdCity: "",
            Name: "",
            Address: "",
            City: { Id: Constants.guidEmpty, Name: "", IdDistrict: Constants.guidEmpty }
        };

        this.customer = newCustomer;
        this.newCustomer = true;
        this.customerValidationEnabled = true;
        this.edit = true;
    }

    public Edit(customer: Customer) { 
        this.customer = customer;
        this.newCustomer = false;
        this.customerValidationEnabled = true;
        this.edit = true;
    }

    onClosed(customer: Customer) {
        this.customer = customer;
        this.customerValidationEnabled = false;
        this.edit = false;

        this.Load();
    }

    onDeleted(customer: Customer) {
        this.customers.splice(this.customers.indexOf(this.customer), 1);
        this.edit = false;
    }
}
