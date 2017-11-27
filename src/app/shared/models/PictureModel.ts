export class PictureModel {
    constructor(
        public picture: File
    ) { }

    isValid() {
        return true;
    }
}
