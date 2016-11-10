import { Component } from "@angular/core";
import { Customer } from "../models/customer";
import { CustomerService } from "../services/customer";

@Component({
    selector: "customers",
    templateUrl: "/app/views/customers.html"
})

export class CustomersComponent {
    public customers: Customer[];
    public customer;

    constructor(public customerService: CustomerService) {
        this.Load();
    }

    public Load() {
        this.customerService.GetAll().subscribe((data) => this.customers = data);
    }

}
