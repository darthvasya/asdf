import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: any = {
    apiUrl: "https://suvorov.co",
    apiEndpoint: "https://dev-api.suvorov.co/api",
    apiEndpointVasyaTest: "http://localhost:52108/api"
};
