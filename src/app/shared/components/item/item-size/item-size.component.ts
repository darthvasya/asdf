import { Input, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-item-size',
    templateUrl: './item-size.component.html',
    styleUrls: ['./item-size.component.css']
})
export class ItemSizeComponent implements OnInit {
    @Input() attributeId: string;
    @Input() itemSizes: any;

    constructor() {
        console.log(this.itemSizes);
    }

    ngOnInit() {

    }

    // tslint:disable-next-line:member-ordering
    data = [
        {
            name: "Классика",
            measureValue: "480",
            price: '10,30'
        }
    ];


    // tslint:disable-next-line:member-ordering
    settings = {
        add: {
            addButtonContent: '<i class="material-icons">add_box</i>',
            createButtonContent: '<i class="material-icons">save</i>',
            cancelButtonContent: '<i class="material-icons">close</i>',
        },
        edit: {
            editButtonContent: '<i class="material-icons">edit</i>',
            saveButtonContent: '<i class="material-icons">save</i>',
            cancelButtonContent: '<i class="material-icons">close</i>',
        },
        delete: {
            deleteButtonContent: '<i class="material-icons">delete_sweep</i>',
            confirmDelete: false,
        },
        columns: {
            name: {
                title: 'Название'
            },
            measureValue: {
                title: 'Вес'
            },
            price: {
                title: 'Цена'
            }
        }
    };

}
