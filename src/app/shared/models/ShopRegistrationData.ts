export class ShopRegistrationData {
    constructor(
        public name: string,
        public town: string,
        public address: string,
        public description: string,
    ) { }

    isValid() {
        return true;
    }
}