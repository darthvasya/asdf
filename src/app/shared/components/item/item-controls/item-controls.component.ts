import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ItemService } from './../../../core/item.service';
import { NotificationService } from './../../../core/notification.service';

import _ from "lodash";

@Component({
    selector: 'app-item-controls',
    templateUrl: './item-controls.component.html',
    styleUrls: ['./item-controls.component.css']
})
export class ItemControlsComponent implements OnInit {
    @Input() shopItem: any;

    constructor(private itemService: ItemService, private notificationService: NotificationService) { }

    ngOnInit() {
    }

    @Output() onDelete = new EventEmitter<number>();

    removeItem(itemId) {
        //update category
        this.itemService.deleteItem(itemId)
        .then((data) => {
            this.onDelete.emit(itemId);
            this.notificationService.showNotification("bottom", "center", "Товар успешно удален!", "success");
        })
        .catch((err) => {
            this.notificationService.showNotification("bottom", "center", "Произошла ошибка удаления!", "danger");
        });
        this.shopItem = {};

    }

}
