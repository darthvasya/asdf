import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddCategoryModel } from './../../../models/AddCategoryModel';

import { ItemService } from './../../../core/item.service';
import { NotificationService } from './../../../core/notification.service';
import { LoaderService } from './../../../core/loader.service';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
    @Input() category: any;

    addCategoryModel = new AddCategoryModel("", null, null);

    constructor(private itemService: ItemService, private notificationService: NotificationService, private loaderService: LoaderService) { }

    ngOnInit() {
    }

    addCategory() {
        this.addCategoryModel.ParentCategoryId
        console.log(this.addCategoryModel);
    }
}
