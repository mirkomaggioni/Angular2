import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { TranslateService } from "ng2-translate";
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

    constructor(public cityService: CityService, public districtService: DistrictService, public alertService: AlertService) {}

    ngOnInit() {
        this.LoadDistricts();
    }

    public Save() {
        this.cityService.Post(this.city).subscribe(
            (data) => {
                this.onSaved.emit(data);
            },
            (error) => this.alertService.Error(error));
    }

    public Close() {
        this.onClosed.emit();
    }

    private LoadDistricts() {
        this.districtService.GetAll().subscribe(
            (data: District[]) => {
                this.districts = data;
            }
        )
    }
}
