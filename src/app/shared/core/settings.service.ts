import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from "rxjs";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import { AuthService } from "./auth.service";

@Injectable()
export class OrdersService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/settings`;

    constructor(
        @Inject(APP_CONFIG) private config: any,
        private http: Http,
        private authService: AuthService
    ) {}

    getStatistic() {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set(
            "Authorization",
            "Bearer " + this.authService.token
        );

        return new Promise((resolve, reject) => {
            this.http
                .get(`${this.API_ROUTE}`, headers)
                .map(res => res.json())
                .catch(err => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe(result => {
                    resolve(result);
                });
        });
    }
}
