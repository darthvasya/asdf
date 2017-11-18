import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddCategoryData } from './../../../models/AddCategoryData';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
    @Input() category: any;

    addCategoryData = new AddCategoryData("", "", "");

    constructor() { }

    ngOnInit() {
    }

    addItem() {
        //this.category.shopItems.push(this.addItemData);
        console.log(this.addCategoryData);
    }
}
