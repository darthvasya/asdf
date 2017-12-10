import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { items } from './items';

import * as _ from "lodash";

import { CategoriesService } from "./../../shared/core/categories.service";
import { LoaderService } from './../../shared/core/loader.service';
import { NotificationService } from './../../shared/core/notification.service';
import { CategoryService } from './../../shared/core/category.service';

import { SortPipe } from './../../shared/pipes/sort.pipe';

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

    items: any;

    constructor(private notificationService: NotificationService, private categoryService: CategoryService, private categoriesService: CategoriesService, private loaderService: LoaderService) {
        this.loadCategories();
    }

    // item adding
    onAddItemEvent(data) {
        //this.getCategoryById(data.categoryId, this.items, data);
    }

    getCategoryById(categoryId, categories, element) {
        categories.forEach(item => {
            this.checkCategoryToAdd(item, categoryId, element);
        });
    }

    checkCategoryToAdd(category, categoryId, element) {
        if (category.id !== categoryId) {
            this.getCategoryById(categoryId, category.categories, element);
        } else {
            category.shopItems.push(element);
        }
    }

    // item deleting
    onDeleted(itemId) {
        this.deleteItemFromItems(itemId, this.items);
    }

    deleteItemFromItems(itemId, category) {
        category.forEach(item => {
            this.checkCategoryToRemoveItem(item, itemId);
        });
    }

    checkCategoryToRemoveItem(category, itemId) {
        const itemToDelete = _.filter(category.shopItems, { id: itemId });
        if (itemToDelete.length < 1) {
            this.deleteItemFromItems(itemId, category.categories);
        } else {
            _.remove(category.shopItems, { id: itemId });
        }
    }

    deleteCategoryFromItems(categoryId, category) {
        category.forEach(item => {
            if(item.id === categoryId)
                _.remove(category, { id: categoryId });
            else
            {
                console.log(item);
                if(item.categories.length > 0)
                    this.deleteCategoryFromItems(categoryId, item.categories);
            }
        });
    }

    checkCategoryToRemove(category, itemId) {
        const categoryToDelete = _.filter(category.categories, { id: itemId });
        if (categoryToDelete.length < 1) {
            this.deleteCategoryFromItems(itemId, category.categories);
        } else {
            _.remove(category.categories, { id: itemId });
        }
    }

    // category adding
    onAddCategoryEvent(data) {
        if (data.categoryId === undefined) {
            console.log(data);
            this.items.push(data);
        }
    }

    deleteCategory(itemCategory) {
        let categoryId = -1;
        if(itemCategory.id === undefined)
            categoryId = itemCategory;
        else
            categoryId = itemCategory.id;
        console.log(itemCategory);
        this.loaderService.display(true);
        this.categoryService.deleteItem(categoryId)
        .then((data) => {
            console.log(itemCategory);
            this.deleteCategoryFromItems(categoryId, this.items);
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Категория успешно удалена!", "success");
        })
        .catch((err) => {
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Произошла ошибка удаления!", "danger");
        });
    }

    // routinues
    loadCategories() {
        this.loaderService.display(true);
        this.categoriesService.getCategories(1)
            .then((items) => {
                this.items = items;
                this.loaderService.display(false);
                console.log(items);
            })
            .catch((err) => {
                this.loaderService.display(false);
                console.log(err);
            });
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
}


