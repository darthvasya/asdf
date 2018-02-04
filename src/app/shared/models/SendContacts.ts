export class SendContacts {
    constructor(
        public Email: string,
        public Subject: string,
        public Body: string,
    ) { }

    isValid() {
        return true;
    }
}
