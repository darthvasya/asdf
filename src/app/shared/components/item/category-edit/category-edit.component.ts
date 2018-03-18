import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UpdateCategoryModel } from './../../../models/UpdateCategoryModel';

import { CategoryService } from './../../../core/category.service';
import { NotificationService } from './../../../core/notification.service';
import { LoaderService } from './../../../core/loader.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
    @Input() category: any;

    updateCategoryModel = new UpdateCategoryModel(-1, "");

    constructor(private categoryService: CategoryService, private notificationService: NotificationService, private loaderService: LoaderService) { }

    ngOnInit() {
    }

    editCategory() {
        this.updateCategoryModel.CategoryId = this.category.id;
        this.categoryService.editCategory(this.updateCategoryModel)
        .then((data) => {
            this.category.categoryName = this.updateCategoryModel.CategoryName;
            this.updateCategoryModel = new UpdateCategoryModel(-1, null);
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Категория успешно изменена!", "success");
        })
        .catch((err) => {
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Произошла ошибка реадктирования!", "danger");
        });
    }
}
