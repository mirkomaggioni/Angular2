import { Component } from "@angular/core";
import { Customer } from "../models/customer";
import { Constants } from "../commons";
import { City } from "../models/city";
import { SelectOption } from "../models/selectOption";
import { AlertService } from "../services/alert";
import { CustomerService } from "../services/customer";
import { CityService } from "../services/city";

@Component({
    selector: "customers",
    templateUrl: "/app/views/customers.html"
})

export class CustomersComponent {
    public customers: Customer[];
    public customer: Customer;
    public edit = false;
    public cityOptions: SelectOption[];

    constructor(public customerService: CustomerService, public alertService: AlertService, public cityService: CityService) {
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
            Address: "",
            IsNew: true
        };

        this.customer = newCustomer;
        this.edit = true;
    }

    public Edit(customer: Customer) {
        this.customer = customer;
        this.edit = true;
    }

    onClosed (customer: Customer) {
        if (this.customer.IsNew) {
            this.customer.Id = customer.Id;
            this.customer.IsNew = false;
            this.customers.push(this.customer);
        }
        else {
            this.customer = customer;
        }

        this.edit = false;
    }

    onDeleted (customer: Customer) {
        this.customers.splice(this.customers.indexOf(this.customer));
        this.edit = false;
    }

    private getOptions() {
        this.cityOptions = new Array<SelectOption>();

        this.cityService.GetAll().subscribe(
            (data: City[]) => {
                data.forEach(city => {
                    this.cityOptions.push(new SelectOption(city));
                });
            },
            (error) => this.alertService.Error(error));
    }
}
