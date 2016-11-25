import { Component } from "@angular/core";
import { Customer } from "../models/customer";
import { Constants } from "../commons";
import { City } from "../models/city";
import { SelectOption } from "../models/selectOption";
import { AlertService } from "../services/alert";
import { CustomerService } from "../services/customer";
import { CityService } from "../services/city";
import { SearchService } from "../services/search";

@Component({
    selector: "customers",
    templateUrl: "/app/views/customers.html"
})

export class CustomersComponent {
    public customers: Customer[];
    public customer: Customer;
    public edit = false;
    public newCustomer = false;
    public customerValidationEnabled = true;
    public cityOptions: SelectOption[];

    constructor(public customerService: CustomerService, public alertService: AlertService, public cityService: CityService, public searchService: SearchService) {
        this.searchService.searchText = "";
        this.Load();
        this.getOptions();
    }

    public Load() {
        this.customerService.GetAll().subscribe(
            (data) => {
                this.customers = data;
                this.alertService.Success("Customers loaded successfully");
            },
            (error) => this.alertService.Error(error));
    }

    public New() {
        let newCustomer: Customer = {
            Id: Constants.guidEmpty,
            IdCity: "",
            Name: "",
            Address: ""
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
        if (customer.Id != Constants.guidEmpty) {
            this.customer = customer;

            if (this.newCustomer) {
                this.customers.push(this.customer);
            }
        }

        this.customerValidationEnabled = false;
        this.edit = false;
    }

    onDeleted(customer: Customer) {
        this.customers.splice(this.customers.indexOf(this.customer), 1);
        this.edit = false;
    }

    private getOptions() {
        this.cityOptions = new Array<SelectOption>();

        this.cityService.GetAll().subscribe(
            (data: City[]) => {
                data.forEach(city => {
                    this.cityOptions.push(new SelectOption(city.Name, city.Id));
                });
            },
            (error) => this.alertService.Error(error));
    }
}
