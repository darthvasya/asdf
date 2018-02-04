export class SendContacts {
    constructor(
        public email: string,
        public subject: string,
        public description: string,
    ) { }

    isValid() {
        return true;
    }
}
