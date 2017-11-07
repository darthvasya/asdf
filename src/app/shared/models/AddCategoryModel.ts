export class AddCategoryModel {
    constructor(
        public CategoryName: string,
        public ShopId: number,
        public ParentCategoryId: number
    ) { }

    isValid() {
        return true;
    }
}
