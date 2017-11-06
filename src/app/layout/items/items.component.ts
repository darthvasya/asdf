import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { items } from './items';

import * as _ from "lodash";

import { CategoriesService } from "./../../shared/core/categories.service";
import { LoaderService } from './../../shared/core/loader.service';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

    items: any;

    constructor(private categoriesService: CategoriesService, private loaderService: LoaderService) {
        this.loadCategories();
    }

    onAddItemEvent(data) {
        console.log("DSASDADSASADDSADSA");
        this.loadCategories();
        console.log(1, data);
    }

    onDeleted(itemId) {
        this.deleteItemFromItems(itemId, this.items);

    }

    deleteItemFromItems(itemId, category) {
        category.forEach(item => {
            this.checkCategory(item, itemId);
        });
    }

    checkCategory(category, itemId) {
        let itemToDelete = _.filter(category.shopItems, {id: itemId});
        if (itemToDelete.length < 1) {
            this.deleteItemFromItems(itemId, category.categories);
        }else{
            _.remove(category.shopItems, {id: itemId});
        }
    }

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
            weight: {
                title: 'Вес'
            },
            price: {
                title: 'Цена'
            }
        }
    };

    ngOnInit() {
    }

    loadCategories() {
        this.categoriesService.getCategories(1)
            .then((items) => {
                this.items = items;
                console.log(items);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


