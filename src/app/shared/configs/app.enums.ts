import { OpaqueToken } from "@angular/core";

export let APP_ENUMS = new OpaqueToken("app.enums");

export enum OrderStatuses {
    Registered = 0,
    Accepted = 1,
    Declined = 2,
    Ready = 3,
    Issued = 4,
    Canceled = 5
};
