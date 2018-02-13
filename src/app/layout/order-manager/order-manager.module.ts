import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";



import { OrderManagerRoutingModule } from "app/layout/order-manager/order-manager-routing.module";
import { OrderManagerComponent } from "./order-manager.component";

import { CategoriesService } from "./../../shared/core/categories.service";
import { ItemService } from './../../shared/core/item.service';
import { SizeService } from './../../shared/core/size.service';
import { CategoryService } from './../../shared/core/category.service';
import { AuthService } from "./../../shared/core/auth.service";




@NgModule({
    imports: [CommonModule, OrderManagerRoutingModule, FormsModule],
    declarations: [OrderManagerComponent],
    // providers: [SignalRService, HelperService]
    providers: [CategoryService, CategoriesService]
})
export class OrderManagerModule {}
