import { Injectable, Inject } from "@angular/core";
import { Component, OnInit, Input } from '@angular/core';
import { APP_CONFIG } from "../../../configs/app.config";

@Component({
    selector: 'app-item-description',
    templateUrl: './item-description.component.html',
    styleUrls: ['./item-description.component.css']
})
export class ItemDescriptionComponent implements OnInit {
    @Input() attributeId: string;
    @Input() shopItem: any;
    @Input() editRowId: any;

    private API_ROUTE: string = `${this.config.apiEndpoint}`;

    constructor( @Inject(APP_CONFIG) private config: any) {
     }

    ngOnInit() {
    }

    toggle(val) {
        this.editRowId = val;
    }

    save() {
        this.editRowId = 0;
    }
}
