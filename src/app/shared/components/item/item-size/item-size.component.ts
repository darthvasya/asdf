import { Input, Component, OnInit } from '@angular/core';

import { CreateSizeModel } from './../../../models/CreateSizeModel';

import { SizeService } from './../../../core/size.service';
import { LoaderService } from './../../../core/loader.service';
import { NotificationService } from './../../../core/notification.service';

@Component({
    selector: 'app-item-size',
    templateUrl: './item-size.component.html',
    styleUrls: ['./item-size.component.css']
})
export class ItemSizeComponent implements OnInit {
    @Input() attributeId: string;
    @Input() itemSizes: any;
    @Input() itemId: number;

    model: CreateSizeModel = new CreateSizeModel(87, "кг", 901, 1337, "котенок");

    constructor(private sizeService: SizeService, private loaderService: LoaderService, private notificationService: NotificationService) {
        console.log(this.itemSizes);

    }

    ngOnInit() {
       // this.sizeService.addItem(this.model);
    }


    // tslint:disable-next-line:member-ordering
    settings = {
        add: {
            addButtonContent: '<i class="material-icons">add_box</i>',
            createButtonContent: '<i class="material-icons">save</i>',
            cancelButtonContent: '<i class="material-icons">close</i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="material-icons">edit</i>',
            saveButtonContent: '<i class="material-icons">save</i>',
            cancelButtonContent: '<i class="material-icons">close</i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="material-icons">delete_sweep</i>',
            confirmDelete: true,
        },
        columns: {
            name: {
                title: 'Название'
            },
            measureValue: {
                title: 'Вес'
            },
            measure: {
                title: 'Мера'
            },
            price: {
                title: 'Цена'
            }
        }
    };

    onDeleteConfirm(event) {
        console.log(event);
        if (window.confirm('Are you sure you want to delete?')) {
            this.sizeService.deleteItem(event.data.id);
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      }

      onSaveConfirm(event) {
        event.newData.ShopItemId = this.itemId;
        if (this.isDataValid(event.newData)) {
            this.sizeService.updateItem(event.newData);
            event.confirm.resolve(event.newData);
        } else {
          event.confirm.reject();
        }
      }

      onCreateConfirm(event) {
        event.newData.ShopItemId = this.itemId;
        if (this.isDataValid(event.newData)) {
            this.sizeService.addItem(event.newData).then((data) => {
                event.confirm.resolve(data);
            });
        } else {
          event.confirm.reject();
        }
      }

      isDataValid(data) {
        data.price = Number(data.price);
        data.measureValue = Number(data.measureValue);

        if(isNaN(data.price) || data.price < 0) {
            this.notificationService.showNotification("bottom", "center", "Цена должна быть числом или не равна 0 и больше 0!", "danger");
            return false;
        }
        if(isNaN(data.measureValue) || data.measureValue < 0) {
            this.notificationService.showNotification("bottom", "center", "Вес должна быть числом или не равна 0 и больше 0!", "danger");
            return false;
        }

        return true;
      }

}
