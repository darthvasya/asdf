export class CreateSizeModel {
    constructor(
        public ShopItemId : number,
        public Measure : string,
        public MeasureValue : number,
        public Price : number,
        public Name  : string,
    ) { }

    isValid() {
        return true;
    }
}
