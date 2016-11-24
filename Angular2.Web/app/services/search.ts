import { Injectable, Input } from "@angular/core";

@Injectable()
export class SearchService {
    private _searchText = "";

    @Input()
    set searchText(searchText) {
        this._searchText = searchText;
    }

    get searchText() {
        return this._searchText;
    }
}