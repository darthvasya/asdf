import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginData } from "../shared/models/LoginData";

import { AuthService } from "../shared/core/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  loginData = new LoginData("", "");
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
  errorMessage = '';

  constructor(public router: Router, private authService: AuthService) {

  }

    ngOnInit () {
    }

  onLogging() {
    if (true) {
      this.authService.login(this.loginData)
        .then(() => {
          this.router.navigate(['/dashboard']);
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

  validateLogin() {
    const username = this.loginData.email;
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
        }
  }

  validatePassword() {
    const password = this.loginData.password;
    if (!password || (password.length < 5 || password.length > 60)) {
        if (!password) {
            this.validationError.password.status = true;
            this.validationError.password.message = 'Введите пароль';
          }
          if (password.length < 5 || password.length > 60) {
            this.validationError.password.status = true;
            this.validationError.password.message = 'Пароль должен содержать не менее 6 и не более 60 символов';
          }
    } else {
        this.validationError.password.status = false;
      }
  }

  isDataValid() {
    return !this.validationError.password.status && !this.validationError.email.status;
  }

  ngAfterViewInit() {
    if (this.authService.isLogged()) this.router.navigate(['/dashboard']);
  }
}
