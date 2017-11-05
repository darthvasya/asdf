export class LoginData {
    constructor(
        public email: string,
        public password: string,
    ) { }

    isValid() {
        return true;
    }
}