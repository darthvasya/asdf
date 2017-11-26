import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddCategoryModel } from './../../../models/AddCategoryModel';

import { CategoryService } from './../../../core/category.service';
import { NotificationService } from './../../../core/notification.service';
import { LoaderService } from './../../../core/loader.service';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
    @Input() category: any;
    @Output() onAddCategoryEvent = new EventEmitter<any>();

    addCategoryModel = new AddCategoryModel("", null);

    constructor(private categoryService: CategoryService, private notificationService: NotificationService, private loaderService: LoaderService) { }

    ngOnInit() {
    }

    addCategory() {
        this.addCategoryModel.ParentCategoryId = this.category.id;
        console.log(this.addCategoryModel);
        this.categoryService.addCategory(this.addCategoryModel)
        .then((data) => {
            this.addCategoryModel = new AddCategoryModel("", null);
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Товар успешно добавлен!", "success");
            console.log(data);
            if(this.category === 0) {
                this.onAddCategoryEvent.emit(data);
            }
            else {
                if(this.category.categories === undefined)
                    this.category.categories = [];
                this.category.categories.push(data);
            }


        })
        .catch((err) => {
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Произошла ошибка добавления!", "danger");
        });
    }
}
