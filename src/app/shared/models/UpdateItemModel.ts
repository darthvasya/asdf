export class UpdateItemModel {
    constructor(
        public Id: number,
        public Name: string,
        public Description: string,
    ) { }

    isValid() {
        return true;
    }
}
