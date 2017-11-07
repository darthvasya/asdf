import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { AddCategoryModel } from "../models/AddCategoryModel";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

@Injectable()
export class CategoryService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/shops`;
    private _user: any;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http) {
    }

    addCategory(item: AddCategoryModel) {
        return new Promise((resolve, reject) => {
            return this.http.post(`${this.API_ROUTE}`, item, HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON)
                .map(res => {
                    return res.json();
                })
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((data) => {
                    resolve(data);
                });
        });
    }

    deleteItem(itemId: number) {

        return new Promise((resolve, reject) => {
            this.http.delete(`${this.API_ROUTE}/` + itemId, HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON)
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((result) => {
                    console.log(result);
                    resolve(result.ok);
                });
        });
    }
}
