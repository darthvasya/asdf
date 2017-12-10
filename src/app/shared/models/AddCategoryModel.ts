export class AddCategoryModel {
    constructor(
        public CategoryName: string,
        public ParentCategoryId: number
    ) { }

    isValid() {
        return true;
    }
}
