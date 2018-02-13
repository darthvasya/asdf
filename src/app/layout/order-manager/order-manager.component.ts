import {
    Component,
    ViewChild,
    OnInit,
    Injectable,
    Inject
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { items } from "./items";

import { CategoriesService } from "./../../shared/core/categories.service";
import { LoaderService } from "./../../shared/core/loader.service";
import { NotificationService } from "./../../shared/core/notification.service";
import { CategoryService } from "./../../shared/core/category.service";

import { AuthService } from "app/shared/core/auth.service";

@Component({
    selector: "app-orderManager",
    templateUrl: "./order-manager.component.html",
    styleUrls: ["./order-manager.component.css"]
})
export class OrderManagerComponent implements OnInit {
    items: any;

    constructor(
        private notificationService: NotificationService,
        private categoryService: CategoryService,
        private categoriesService: CategoriesService,
        private loaderService: LoaderService,
        private authService: AuthService
    ) {
        this.loadCategories();
    }

    loadCategories() {
        this.loaderService.display(true);
        this.categoriesService
            .getCategories(this.authService.userData.shopId)
            .then(items => {
                this.items = items;
                this.loaderService.display(false);
            })
            .catch(err => {
                this.loaderService.display(false);
            });
    }
    ngOnInit() {}
}
