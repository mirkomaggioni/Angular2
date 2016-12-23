import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { Constants } from "../shared/commons";
import { City } from "./city.model";
import { District } from "./district.model";
import { AlertService } from "../shared/alert.service";
import { CityService } from "./city.service";
import { DistrictService } from "./district.service";

@Component({
    moduleId: module.id,
    selector: "city-detail",
    templateUrl: "city.detail.component.html"
})

export class CityDetailComponent {
    @Input() city: City;
    @Output() onSaved = new EventEmitter<City>();
    @Output() onClosed = new EventEmitter();
    public districts: District[];
    public district: District;

    constructor(private cityService: CityService, private districtService: DistrictService, private alertService: AlertService) { }

    ngOnInit() {
        this.LoadDistricts();
    }

    public Save() {
        if (this.district != null) {
            this.districtService.Post(this.district).subscribe(
                (data: District) => {
                    this.city.IdDistrict = data.Id;
                    this.SaveCity();
                },
                (error) => this.alertService.Error(error));
        }
        else {
            this.SaveCity();
        }


    }

    public Close() {
        this.onClosed.emit();
    }

    public AddDistrict() {
        this.district = {
            Id: Constants.guidEmpty,
            Name: "",
            Country: ""
        };
    }

    private LoadDistricts() {
        this.districtService.GetAll().subscribe(
            (data: District[]) => {
                this.districts = data;
            }
        )
    }

    private SaveCity() {
        this.cityService.Post(this.city).subscribe(
            (data) => {
                this.district = null;
                this.onSaved.emit(data);
            },
            (error) => this.alertService.Error(error));
    }
}
