import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: any = {
    apiEndpoint: "https://prod.api.suvorov.co/api",
    endpoint: "https://prod.api.suvorov.co"
};
