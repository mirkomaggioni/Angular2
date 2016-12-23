import { Injectable, Input, Output, EventEmitter } from "@angular/core";

@Injectable()
export class SearchService {
    @Input() _searchText = "";

    @Input()
    set searchText(searchText) {
        this._searchText = searchText;

        if (this._searchText == "") {
            this.onResetted.emit(this._searchText);
        }
    }

    get searchText() {
        return this._searchText;
    }

    @Output() onResetted = new EventEmitter<string>();
}