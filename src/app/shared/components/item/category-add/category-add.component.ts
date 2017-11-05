import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AddCategoryData } from './../../../models/AddCategoryData';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
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
