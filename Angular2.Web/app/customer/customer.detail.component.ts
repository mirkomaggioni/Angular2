import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TranslateService } from "ng2-translate";
import * as _ from "lodash";

import { Customer } from "./customer.model";
import { City } from "../city/city.model";
import { AlertService } from "../core/alert.service";
import { CustomerService } from "./customer.service";
import { Constants } from "../shared/commons";

@Component({
    moduleId: module.id,
    selector: "customer-detail",
    templateUrl: "customer.detail.component.html"
})

export class CustomerDetailComponent {
    @Input() isNew: boolean;
    @Input() validationEnabled: boolean;
    @Output() onClosed = new EventEmitter<Customer>();
    @Output() onDeleted = new EventEmitter<Customer>();
    private currentCustomer: Customer;
    private originalCustomer: Customer;

    @Input()
    set customer(customer: Customer) {
        this.currentCustomer = customer;
        this.backupCustomer(this.currentCustomer);
    }

    get customer() {
        return this.currentCustomer;
    }

    constructor(private customerService: CustomerService, private alertService: AlertService, private translateService: TranslateService) {}

    public Save() {
        if (this.isNew) {
            this.customerService.Post(this.customer).subscribe(
                (data) => {
                    this.customer = data;
                    
                    this.translateService.get("CUSTOMERSAVED").subscribe((res: string) => {
                        this.alertService.Success(res);
                    });
                },
                (error) => this.alertService.Error(error));
        }
        else {
            this.customerService.Put(this.customer.Id, this.customer).subscribe(
                (data) => {
                    this.backupCustomer(this.currentCustomer);
                    this.translateService.get("CUSTOMERSAVED").subscribe((res: string) => {
                        this.alertService.Success(res);
                    });
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
                this.translateService.get("CUSTOMERDELETED").subscribe((res: string) => {
                    this.alertService.Success(res);
                });
                this.onDeleted.emit(this.customer);
            },
            (error) => this.alertService.Error(error));
    }

    onCitySelected(city: City) {
        this.customer.IdCity = city.Id;
        this.customer.City = city;
    }

    isValid(form: NgForm) {
        return form.valid && this.customer.IdCity != Constants.guidEmpty;
    }

    private backupCustomer(customer: Customer) {
        this.originalCustomer = _.cloneDeep(customer);
    }

    private restoreCustomer() {
        this.currentCustomer = _.mapValues(this.originalCustomer, function(value) {
            return value;
        });
    }
}
