export class AddItemData {
    constructor(
        public name: string,
        public description: string,
        public categoryId: number,
        public picture: File
    ) { }

    isValid() {
        return true;
    }
}
