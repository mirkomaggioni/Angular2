import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Customer } from "../models/customer";
import { City } from "../models/city";
import { SelectOption } from "../models/selectOption";
import { AlertService } from "../services/alert";
import { CustomerService } from "../services/customer";
import { CityService } from "../services/city";

@Component({
    selector: "customers-detail",
    templateUrl: "/app/views/customers.detail.html"
})

export class CustomersDetailComponent {
    @Input() isNew: boolean;
    @Input() validationEnabled: boolean;
    @Input() cityOptions: SelectOption[];
    @Output() onClosed = new EventEmitter<Customer>();
    @Output() onDeleted = new EventEmitter<Customer>();
    private currentCustomer: Customer;
    private originalCustomer: Customer;

    @Input() 
    set customer (customer: Customer) {
        this.currentCustomer = customer;
        this.backupCustomer(this.currentCustomer);
    }

    get customer () { 
        return this.currentCustomer;
    }

    constructor(public customerService: CustomerService, public alertService: AlertService, public cityService: CityService) { }

    public Save() {
        if (this.isNew) {
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
                    this.backupCustomer(this.currentCustomer);
                    this.alertService.Success("Customer saved");
                },
                (error) => this.alertService.Error(error));
        }
    }

    public Close() {
        this.restoreCustomer();
        this.onClosed.emit(this.customer);
    }

    public Delete() {
        this.customerService.Delete(this.customer.Id).subscribe(
            () => {
                this.alertService.Success("Customer deleted");
                this.onDeleted.emit(this.customer);
            },
            (error) => this.alertService.Error(error));
    }

    private backupCustomer(customer: Customer) {
        this.originalCustomer = {
            Id: customer.Id,
            Name: customer.Name,
            Address: customer.Address,
            IdCity: customer.IdCity
        }
    }

    private restoreCustomer() {
        this.currentCustomer.Name = this.originalCustomer.Name;
        this.currentCustomer.Address = this.originalCustomer.Address;
        this.currentCustomer.IdCity = this.originalCustomer.IdCity;
    }
}
