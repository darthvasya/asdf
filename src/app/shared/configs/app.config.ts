import {OpaqueToken} from "@angular/core";

export let APP_CONFIG = new OpaqueToken('app.config');

export const AppConfig: any = {
  apiEndpoint: "http://165.227.168.147/api",
  apiEndpointVasyaTest: "http://localhost:52108/api"
};
