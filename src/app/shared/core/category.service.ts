import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { AddCategoryModel } from "../models/AddCategoryModel";
import { UpdateCategoryModel } from "../models/UpdateCategoryModel";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import { AuthService } from "./auth.service";

@Injectable()
export class CategoryService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/categories`;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http, private authService: AuthService) {
    }

    addCategory(item: AddCategoryModel) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

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

    editCategory(item: UpdateCategoryModel) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            return this.http.put(`${this.API_ROUTE}`, item, headers)
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
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            this.http.delete(`${this.API_ROUTE}/` + itemId, headers)
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((result) => {
                    resolve(result.ok);
                });
        });
    }
}
