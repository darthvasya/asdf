import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: any = {
    apiUrl: "https://suvorov.co",
    apiEndpoint: "https://suvorov.co/api",
    apiEndpointVasyaTest: "http://localhost:52108/api"
};

export enum OrderStatuses {
    Registered = 0,
    Accepted = 1,
    Declined = 2,
    Ready = 3,
    Issued = 4,
    Canceled = 5
};
