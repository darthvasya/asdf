import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShopRegistrationData } from "../shared/models/ShopRegistrationData";
import { UserRegistrationData } from "../shared/models/UserRegistrationData";
import { ShopRegistrationModel } from "../shared/models/ShopRegistrationModel";

import { AuthService } from "../shared/core/auth.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit {

    shopRegistrationModel = new ShopRegistrationModel(null, null);
    userRegistrationData = new UserRegistrationData("", "", "", "", "");
    shopRegistrationData = new ShopRegistrationData("", "", "", "");

    errorMessage = '';

    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() { }

    onRegistration() {

        this.validate();
        if (this.isDataValid()) {
            this.shopRegistrationModel.ShopRegistrationData = this.shopRegistrationData;
            this.shopRegistrationModel.UserRegistrationData = this.userRegistrationData;

            this.authService.register(this.shopRegistrationModel)
                .then(() => {
                    
                    this.router.navigate(['/login']);
                })
                .catch((err) => {
                    if (err.status === 401 || err.status == 400) {
                        this.errorMessage = 'Неправильный логин или пароль';
                    } else if (err.status === 500) {
                        this.errorMessage = 'Извините, ошибка на сервере';
                    } else if (err.status === 404) {
                        this.errorMessage = 'Извините, ошибка на сервере';
                    } {
                        this.errorMessage = err._body;
                    }
                });
        }
    }

    validate() { }

    isDataValid() {
        return true;
    }

    ngAfterViewInit() {
        return true;
        //if (this.authService.isLogged()) this.router.navigate(['/dashboard']);
    }
}
