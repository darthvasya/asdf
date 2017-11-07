import { Component, OnInit, Input, EventEmitter, Output, Injectable, Inject } from '@angular/core';
import { APP_CONFIG } from "../../../configs/app.config";

@Component({
    selector: 'app-item-description',
    templateUrl: './item-description.component.html',
    styleUrls: ['./item-description.component.css']
})
export class ItemDescriptionComponent implements OnInit {
    @Input() attributeId: string;
    @Input() shopItem: any;


    @Output() onDeleted = new EventEmitter<number>();

    private API_ROUTE: string = `${this.config.apiUrl}`;

    constructor( @Inject(APP_CONFIG) private config: any) {
    }

    ngOnInit() {

    }

    onDelete(data) {
        this.onDeleted.emit(data);
    }

    updateItem() {

    }
}
