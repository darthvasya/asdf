import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { AddItemData } from "../models/AddItemData";
import { UpdateItemModel } from "../models/UpdateItemModel";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import { AuthService } from "./auth.service";

@Injectable()
export class ItemService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/shopitems`;
    private _user: any;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http, private authService: AuthService) {
    }

    addItem(item: AddItemData) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        let formData: FormData = new FormData();
        formData.append('Picture', item.picture);
        formData.append('Name', item.name);
        formData.append('CategoryId', item.categoryId.toString());
        formData.append('Description', item.description);

        return new Promise((resolve, reject) => {
            return this.http.post(`${this.API_ROUTE}`, formData, headers)
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

    editItem(model: UpdateItemModel) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_ROUTE}/`, model, headers)
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((result) => {
                    resolve(result.ok);
                });
        });
    }

    updatePicture(itemId: number, picture: File) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        let formData: FormData = new FormData();
        formData.append('Picture', picture);

        return new Promise((resolve, reject) => {
            this.http.put(`${this.API_ROUTE}/` + itemId + `/Picture`, formData, headers)
                .catch((err) => {
                    reject(err);
                    return Observable.throw(err);
                })
                .subscribe((result) => {
                    resolve(result);
                });
        });
    }
}
