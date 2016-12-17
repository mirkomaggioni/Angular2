import { Component, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { Customer } from "../models/customer";
import { City } from "../models/city";
import { Constants } from "../commons";
import { AlertService } from "../services/alert";
import { CustomerService } from "../services/customer";
import { CityService } from "../services/city";
import { SearchService } from "../services/search";

@Component({
    selector: "customers",
    templateUrl: "/app/views/customers.html"
})

export class CustomersComponent implements OnInit {
    public customers: Customer[];
    public cities: City[];
    public customer: Customer;
    public edit = false;
    public newCustomer = false;
    public customerValidationEnabled = true;

    constructor(public customerService: CustomerService, public cityService: CityService, public alertService: AlertService, public searchService: SearchService, public translateService: TranslateService) { }

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
