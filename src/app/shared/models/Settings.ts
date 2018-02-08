export class Settings {
    constructor(
        public StartWorkingDayDateTime: any,
        public EndWorkingDayDateTime: any,
        public ManagerPhone: string,
        public ShopChat: string
    ) {}

    isValid() {
        return true;
    }
}
