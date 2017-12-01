import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from "rxjs";

import { ChangeOrderStateDTO } from "../models/ChangeOrderStateDTO";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import { AuthService } from "./auth.service";

@Injectable()
export class OrdersService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/orders`;
    private _user: any;

    constructor(
        @Inject(APP_CONFIG) private config: any,
        private http: Http,
        private authService: AuthService
    ) {}

    getOrders() {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            this.http
                .get(`${this.API_ROUTE}` + "?page" + 1 + "&pageSize=" + 200, headers)
                .map(res => res.json())
                .catch(err => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe(result => {
                    console.log(result);
                    resolve(result);
                });
        });
    }

    changeStatus(orderId: number, statusId: number) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        let body = {OrderId: orderId, State: statusId}
        return new Promise((resolve, reject) => {
            this.http
                .put(`${this.API_ROUTE}`, body, headers)
                .catch(err => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe(() => {
                    resolve();
                });
        });
    }
}
