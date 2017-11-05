import { Component, OnInit, Input } from '@angular/core';
import _ from "lodash";

@Component({
    selector: 'app-item-controls',
    templateUrl: './item-controls.component.html',
    styleUrls: ['./item-controls.component.css']
})
export class ItemControlsComponent implements OnInit {
    @Input() shopItem: any;

    constructor() { }

    ngOnInit() {
    }

    removeItem(itemId) {
        //delete query to serve
        //update category
        //al this logic in service
        this.shopItem = {};

    }

}
