import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ItemService } from './../../../core/item.service';
import { NotificationService } from './../../../core/notification.service';
import { LoaderService } from './../../../core/loader.service';

import _ from "lodash";

@Component({
    selector: 'app-item-controls',
    templateUrl: './item-controls.component.html',
    styleUrls: ['./item-controls.component.css']
})
export class ItemControlsComponent implements OnInit {
    @Input() shopItem: any;

    constructor(private itemService: ItemService, private notificationService: NotificationService, private loaderService: LoaderService) { }

    ngOnInit() {
    }

    @Output() onDelete = new EventEmitter<number>();

    removeItem(itemId) {
        this.loaderService.display(true);
        this.itemService.deleteItem(itemId)
        .then((data) => {
            this.loaderService.display(false);
            this.onDelete.emit(itemId);
            this.notificationService.showNotification("bottom", "center", "Товар успешно удален!", "success");
        })
        .catch((err) => {
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Произошла ошибка удаления!", "danger");
        });
        this.shopItem = {};

    }

}
