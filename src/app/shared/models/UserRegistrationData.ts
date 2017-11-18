export class UserRegistrationData {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public surname: string,
        public phone: string
    ) { }
    
    isValid() {
        return true;
    }
}