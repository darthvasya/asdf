export class AddCategoryData {
    constructor(
        public CategoryName: string,
        public ShopId: string,
        public ParentCategoryId: string
    ) { }

    isValid() {
        return true;
    }
}
