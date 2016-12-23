import { Component, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { SharedModule } from "../shared/shared.module";
import { Customer } from "./customer.model";
import { City } from "./city.model";
import { Constants } from "../shared/commons";
import { AlertService } from "../shared/alert.service";
import { CustomerService } from "./customer.service";
import { CityService } from "./city.service";
import { SearchService } from "../shared/search.service";

@Component({
    moduleId: module.id,
    selector: "customer",
    templateUrl: "customer.component.html"
})

export class CustomerComponent implements OnInit {
    public customers: Customer[];
    public cities: City[];
    public customer: Customer;
    public edit = false;
    public newCustomer = false;
    public customerValidationEnabled = true;

    constructor(private customerService: CustomerService, private cityService: CityService, private alertService: AlertService, private searchService: SearchService, private translateService: TranslateService) {}

    ngOnInit() {
        this.searchService.searchText = "";
        this.Load();
    }

    public Load() {
        this.LoadCities();

        this.customerService.GetAll().subscribe(
            (data) => {
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
            City: null
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

    private LoadCities() {
        this.cityService.GetAll().subscribe(
            (data: City[]) => {
                this.cities = data;
            }
        )
    }
}
