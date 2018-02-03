import { Injectable, Inject } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";

import { ReplaySubject } from "rxjs";
import { Subject, Observable } from "rxjs";

import { APP_CONFIG } from "../configs/app.config";
import { HttpUtil } from "../utils/http.util";

import * as _ from "lodash";

@Injectable()
export class HelperService {
    private API_ROUTE: string = `${this.config.apiEndpoint}/orders`;
    private _user: any;

    constructor(@Inject(APP_CONFIG) private config: any, private http: Http) {}

    orderArray(items, predicate, reverse) {
        if (items === undefined || items === null || items.length < 1)
            return items;

        if (this.isDate(new Date(items[0][predicate]))) {
            return _.sortByOrder(
                items,
                function(item) {
                    return -new Date(item[predicate]).getTime();
                },
                [reverse ? "asc" : "desc"]
            );
        } else {
            return _.sortByOrder(items, [predicate, reverse ? "asc" : "desc"]);
        }
    }

    isDate(value) {
        if (isNaN(value.getTime())) {
            return false; //date is invalid
        } else {
            return value instanceof Date;
        }
    }
}
