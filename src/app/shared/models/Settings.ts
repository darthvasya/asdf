export class Settings {
    constructor(
        public StartWorkingDayDateTime: any,
        public EndWorkingDayDateTime: any,
        public ManagerPhone: string
    ) {}

    isValid() {
        return true;
    }
}
