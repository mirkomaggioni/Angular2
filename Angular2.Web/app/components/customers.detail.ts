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
    @Input() customer: Customer;
    @Input() cityOptions: SelectOption[];
    @Output() onClosed = new EventEmitter<Customer>();
    @Output() onDeleted = new EventEmitter<Customer>();

    constructor(public customerService: CustomerService, public alertService: AlertService, public cityService: CityService) {
        
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
                    this.alertService.Success("Customer saved");
                },
                (error) => this.alertService.Error(error));
        }
    }

    public Close() {
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
}
