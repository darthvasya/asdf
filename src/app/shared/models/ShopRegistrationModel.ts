import { ShopRegistrationData } from "./ShopRegistrationData";
import { UserRegistrationData } from "./UserRegistrationData";

export class ShopRegistrationModel {
    constructor(
        public ShopRegistrationData: ShopRegistrationData,
        public UserRegistrationData: UserRegistrationData
    ) { }

    isValid() {
        return true;
    }
}