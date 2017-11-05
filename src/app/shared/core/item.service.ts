import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { AddItemData } from "../models/AddItemData";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

@Injectable()
export class ItemService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/shopitems`;
    private _user: any;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http) {
    }
    
    addItem(item: AddItemData) {
        let formData: FormData = new FormData();
        formData.append('Picture', item.picture);
        formData.append('Name', item.name);
        formData.append('CategoryId', "2");
        formData.append('Description', item.description);

        return new Promise((resolve, reject) => {
            return this.http.post(`${this.API_ROUTE}`, formData, HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON)
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
}
