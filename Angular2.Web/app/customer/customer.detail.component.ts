import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Customer } from "./customer.model";
import { City } from "./city.model";
import { AlertService } from "../shared/alert.service";
import { CustomerService } from "./customer.service";
import { Constants } from "../shared/commons";

@Component({
    moduleId: module.id,
    selector: "customer-detail",
    templateUrl: "customer.detail.component.html"
})

export class CustomerDetailComponent {
    @Input() cities: City[];    
    @Input() isNew: boolean;
    @Input() validationEnabled: boolean;
    @Output() onClosed = new EventEmitter<Customer>();
    @Output() onDeleted = new EventEmitter<Customer>();
    @ViewChild('citiesModal') public citiesModal: ModalDirective;
    public city: City;
    public idCitySelected: string;
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
        this.customer.City = null;

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

    public AddCity() {
        this.city = {
            Id: Constants.guidEmpty,
            IdDistrict: "",
            Name: "",
            Zip: 0
        };

        this.citiesModal.show();
    }

    onCitySaved(city: City) {
        this.customer.IdCity = city.Id;
        this.city = city;
        this.cities.push(city);
        this.citiesModal.hide();
    }

    onCityClosed() {
        this.city = null;
        this.citiesModal.hide();
    }

    private backupCustomer(customer: Customer) {
        this.originalCustomer = {
            Id: customer.Id,
            IdCity: customer.IdCity,
            Name: customer.Name,
            Address: customer.Address,
            City: customer.City
        }
    }

    private restoreCustomer() {
        this.currentCustomer.Name = this.originalCustomer.Name;
        this.currentCustomer.Address = this.originalCustomer.Address;
        this.currentCustomer.City = this.originalCustomer.City;
    }
}
