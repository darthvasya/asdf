import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

@Injectable()
export class CategoriesService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/shops`;
    private _user: any;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http) {

    }

    getCategories(shopId: number) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.API_ROUTE}/${shopId}/categories`)
                .map(res => res.json())
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((result) => {
                    console.log(result);
                    resolve(result);
                });
        });
    }
}
