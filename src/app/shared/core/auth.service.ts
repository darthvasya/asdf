import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { LoginData } from "../models/LoginData";
import { ShopRegistrationModel } from "../models/ShopRegistrationModel";
import { Token } from "../models/Token";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

@Injectable()
export class AuthService {
    private AUTH_ROUTE: string = `${this.config.apiEndpoint}/account`;
    private _user: any;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http) {

    }

    get userData(): any {
        return JSON.parse(localStorage.getItem('shop-app-user-data'));
    }

    set userData(value: any) {
        localStorage.setItem('shop-app-user-data', JSON.stringify(value));
    }

    get userName(): any {
        return this.userData ? this.userData.username : null;
    }

    get token(): string {
        return this.userData ? this.userData.access_token : '';
    }

    login(loginData: LoginData) {
        console.log(loginData);
        return new Promise((resolve, reject) => {
            return this.http.post(`${this.AUTH_ROUTE}/token`, loginData, HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON)
                .map(res => {
                    this.userData = res.json();
                    localStorage.setItem('isLogged', JSON.stringify(true));
                    return res.json();
                })
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((user) => {
                    this.userData = user;
                    resolve();
                });
        });
    }

    register(registerationData: ShopRegistrationModel) {
        console.log(registerationData);
        return new Promise((resolve, reject) => {
            return this.http.post(`${this.AUTH_ROUTE}/registershop`, registerationData, HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON)
                .map(res => {
                    console.log(res.json());
                    return res.json();
                })
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((result) => {
                    resolve();
                });
        });
    }

    // logout() {
    //     return new Promise((resolve, reject) => {
    //         this.http.post(`${this.AUTH_ROUTE}/logout?token=${this.token}`, null, HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON)
    //             .catch((err) => {
    //                 reject(err);
    //                 return Observable.throw(err);
    //             })
    //             .subscribe((res) => {
    //                 this.userData = null;
    //                 localStorage.setItem('isLogged', JSON.stringify(false));
    //                 resolve();
    //             });

    //     });
    // }
    logout() {
        this.userData = null;
        localStorage.setItem('isLogged', '');
    }

    isLogged() {
        return !!this.token;
    }
}
