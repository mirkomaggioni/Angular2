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
    public cityOptions: SelectOption[];

    public customer;

    constructor(public customerService: CustomerService, public alertService: AlertService, public cityService: CityService) {
        this.Load();
    }

    public Load() {
        this.getOptions();

        this.customerService.GetAll().subscribe(
            (data) => {
                this.customers = data;
                this.alertService.Success("Customers loaded succesfully");
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
    }

    public Edit(customer: Customer) {
        this.customer = customer;
    }

    public Save() {
        if (this.customer.IsNew) {
            this.customerService.Post(this.customer).subscribe(
                (data) => {
                    this.customer = data;
                    this.alertService.Success("Customer saved");
                },
                (error) => this.alertService.Error(error));
        }
        else {
            this.customerService.Put(this.customer.Id, this.customer).subscribe(
                (data) => {
                    this.customer = data;
                    this.alertService.Success("Customer saved");
                },
                (error) => this.alertService.Error(error));
        }
    }

    public Close() {
        this.customer = null;
    }

    public Delete() {
        this.customerService.Delete(this.customer.Id).subscribe(
            () => {
                this.customers.splice(this.customers.indexOf(this.customer));
                this.alertService.Success("Customer deleted");
            },
            (error) => this.alertService.Error(error));
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
