import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { SendContacts } from "app/shared/models/SendContacts";

import { ContactsService } from '../../shared/core/contacts.service';
import { LoaderService } from '../../shared/core/loader.service';
import { NotificationService } from '../../shared/core/notification.service';

@Component({
    selector: "app-contacts",
    templateUrl: "./contacts.component.html",
    styleUrls: ["./contacts.component.css"],
})
export class ContactsComponent implements OnInit {

    model = new SendContacts("", "", "");

    constructor(private contactService: ContactsService, private loaderService: LoaderService, private notificationService: NotificationService) {}

    ngOnInit() {

    }
    addItem() {
        // this.model.categoryId = this.category.id;
        this.loaderService.display(true);
        this.contactService.addItem(this.model)
            .then(() => {
                console.log(this.model);
                this.model = new SendContacts("", "", "");
                this.loaderService.display(false);
                this.notificationService.showNotification("bottom", "center", "Успешно доставлено!", "success");

            })
            .catch((err) => {
                this.loaderService.display(false);
                this.notificationService.showNotification("bottom", "center", "Произошла ошибка доставки!", "danger");
            });
    }
}
