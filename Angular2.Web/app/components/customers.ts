import { Component } from "@angular/core";
import { Customer } from "../models/customer";
import { AlertService } from "../services/alert";
import { CustomerService } from "../services/customer";

@Component({
    selector: "customers",
    templateUrl: "/app/views/customers.html"
})

export class CustomersComponent {
    public customers: Customer[];
    public customer;

    constructor(public customerService: CustomerService, public alertService: AlertService) {
        this.Load();
    }

    public Load() {
        this.customerService.GetAll().subscribe(
            (data) => { 
                this.customers = data;
                this.alertService.Success("Customers loaded succesfully"); 
            }, 
            (error) => this.alertService.Error(error));
    }

    public New() {
        let newCustomer: Customer = {
            Id: "",
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

    public Delete() {
        this.customerService.Delete(this.customer.Id).subscribe(
            () => {
                this.customers.splice(this.customers.indexOf(this.customer));
                this.alertService.Success("Customer deleted");                
            },
            (error) => this.alertService.Error(error));
    }
}
