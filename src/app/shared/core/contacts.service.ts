import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from 'rxjs';

import { SendContacts } from "../models/SendContacts";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import { AuthService } from "./auth.service";

@Injectable()
export class ContactsService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/shopitems`;
    private _user: any;

    constructor( @Inject(APP_CONFIG) private config: any, private http: Http, private authService: AuthService) {
    }

    addItem(item: SendContacts) {
        let headers = HttpUtil.REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE;
        headers.headers.set("Authorization", "Bearer " + this.authService.token);

        let formData: FormData = new FormData();
        formData.append('email', item.email);
        formData.append('name', item.subject);
        formData.append('description', item.description);

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
}
