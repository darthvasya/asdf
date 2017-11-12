import { RequestOptions, Headers, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";

export class HttpUtil {

    private static access_token = "";

    constructor() {
        const value = {
            access_token: ""
        };
        localStorage.setItem('shop-app-user-data', JSON.stringify(value));
    }

    static REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON = new RequestOptions({
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '**',
            'Access-Control-Allow-Methods': '**',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('shop-app-user-data'))['access_token']
        })
    });

    static REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE = new RequestOptions({
        headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '**',
            'Access-Control-Allow-Methods': '**',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('shop-app-user-data'))['access_token']
        })
    });
}
