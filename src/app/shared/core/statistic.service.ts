import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from "rxjs";

// import { ChangeOrderStateDTO } from "../models/ChangeOrderStateDTO";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import { AuthService } from "./auth.service";
// import { Promise } from "q";

@Injectable()
export class StatisticService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/dashboard`;
    private _user: any;

    constructor(
        @Inject(APP_CONFIG) private config: any,
        private http: Http,
        private authService: AuthService
    ) {}

    getHoursOrders() {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            this.http
                .get(`https://suvorov.co/api/statistics/hoursOrders`, headers)
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

    getWeekOrders() {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            this.http
                .get(`https://suvorov.co/api/statistics/weekOrders`, headers)
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

    getNewCustomers() {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            this.http
                .get(`https://suvorov.co/api/statistics/newCustomers`, headers)
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
}
