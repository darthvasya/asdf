import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: any = {
    apiUrl: "https://165.227.168.147",
    apiEndpoint: "https://165.227.168.147/api",
    apiEndpointVasyaTest: "http://localhost:52108/api"
};
