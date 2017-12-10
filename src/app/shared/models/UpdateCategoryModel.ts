export class UpdateCategoryModel {
    constructor(
        public CategoryId: number,
        public CategoryName: string
    ) { }

    isValid() {
        return true;
    }
}
