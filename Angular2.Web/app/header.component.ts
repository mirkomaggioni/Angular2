import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SearchService } from "./shared/search.service";

@Component({
    moduleId: module.id,
    selector: "header",
    templateUrl: "header.component.html"
})

export class HeaderComponent implements OnInit {
    searchText: string;

    constructor (private searchService: SearchService) {}

    ngOnInit() {
        this.searchService.onResetted.subscribe((searchText: string) => {
           if (searchText == "") {
               this.searchText = searchText;
           }
        });
    }

    public Search() {
        this.searchService.searchText = this.searchText;
    }
}