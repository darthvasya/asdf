import { RequestOptions, Headers, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";

export class HttpUtil {
    constructor() {
    }

    static REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON = new RequestOptions({
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '**',
            'Access-Control-Allow-Methods': '**'
        })
    });

    static REQUEST_OPTIONS_WITH_CONTENT_TYPE_JSON_WITHOUT_CONTENT_TYPE = new RequestOptions({
        headers: new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '**',
            'Access-Control-Allow-Methods': '**'
        })
    });
}
