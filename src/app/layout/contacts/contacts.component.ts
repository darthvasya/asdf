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
    validationError = {
        email: {
          status: false,
          message: '',
        },
        password: {
          status: false,
          message: '',
        },
      };
    constructor(private contactService: ContactsService, private loaderService: LoaderService, private notificationService: NotificationService) {}

    ngOnInit() {
    }
    addItem() {
        // this.model.categoryId = this.category.id;
        if(this.validateLogin()){
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
    validateLogin() {
        const username = this.model.Email;
        const regxp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!username || (username.length < 6 || username.length > 60) || (!regxp.test(username))) {
            if (!username) {
                this.validationError.email.status = true;
                this.validationError.email.message = 'Введите имя пользователя';

            }
            if (username.length < 6 || username.length > 60) {
                this.validationError.email.status = true;
                this.validationError.email.message = 'Имя пользоваетля должно иметь не менее 6 и не более 24 символов';
            }
            if (!regxp.test(username)) {
                this.validationError.email.status = true;
                this.validationError.email.message = 'Имя пользователя может ' +
                    'содержать буквы латинского алфавита (большие и маленькие), знак подчёркивания "_" и точку "."';
                }
            } else {
                this.validationError.email.status = false;
                this.validationError.email.message = 'Валидный';
                return true;
            }
            return false;
      }
}
