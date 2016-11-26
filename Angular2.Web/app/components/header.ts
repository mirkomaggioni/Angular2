import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SearchService } from "../services/search";

@Component({
    selector: "header",
    templateUrl: "/app/views/header.html"
})

export class HeaderComponent implements OnInit {
    searchText: string;

    constructor (public searchService: SearchService) {}

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