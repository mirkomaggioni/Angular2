import { Component, Output, EventEmitter } from "@angular/core";
import { SearchService } from "../services/search";

@Component({
    selector: "header",
    templateUrl: "/app/views/header.html"
})

export class HeaderComponent {
    searchText: string;

    constructor (public searchService: SearchService) {}

    public Search() {
        this.searchService.searchText = this.searchText;
    }
}