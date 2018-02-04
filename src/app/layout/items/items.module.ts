import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileDropModule }  from 'ng2-file-drop';


import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';

import { CategoriesService } from "./../../shared/core/categories.service";
import { ItemService } from './../../shared/core/item.service';
import { SizeService } from './../../shared/core/size.service';
import { CategoryService } from './../../shared/core/category.service';
import { AuthService } from "./../../shared/core/auth.service";

import { environment } from '../../../environments/environment';

import { SortPipe } from './../../shared/pipes/sort.pipe';

import {
    ItemControlsComponent,
    ItemSizeComponent,
    ItemDescriptionComponent,
    AddItemComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    EditItemComponent
} from './../../shared';


@NgModule({
    imports: [
        CommonModule,
        ItemsRoutingModule,
        Ng2SmartTableModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2FileDropModule
    ],
    declarations: [
        ItemsComponent,
        ItemSizeComponent,
        ItemDescriptionComponent,
        ItemControlsComponent,
        AddItemComponent,
        CategoryAddComponent,
        CategoryEditComponent,
        EditItemComponent
    ],
    providers: [
        CategoriesService,
        ItemService,
        SizeService,
        CategoryService,
        AuthService
    ]
})
export class ItemsModule {}
