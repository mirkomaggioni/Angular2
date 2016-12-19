import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
import { Constants } from "../commons";
import { City } from "../models/city";
import { District } from "../models/district";
import { AlertService } from "../services/alert";
import { CityService } from "../services/city";
import { DistrictService } from "../services/district";

@Component({
    selector: "cities-detail",
    templateUrl: "/app/views/cities.detail.html"
})

export class CitiesDetailComponent {
    @Input() city: City;
    @Output() onSaved = new EventEmitter<City>();
    @Output() onClosed = new EventEmitter();
    public districts: District[];
    public district: District;

    constructor(public cityService: CityService, public districtService: DistrictService, public alertService: AlertService) { }

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
