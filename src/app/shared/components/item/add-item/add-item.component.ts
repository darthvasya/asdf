import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile } from 'ng2-file-drop';

import { AddItemData } from './../../../models/AddItemData';
import { Picture } from './../../../models/Picture';

import { ItemService } from './../../../core/item.service';
import { LoaderService } from './../../../core/loader.service';

declare var $: any;

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
    @Input() category: any;

    @Output('addItem') onAddItemEvent = new EventEmitter();

    @Output('publish') publishEvent = new EventEmitter<Picture>();
    model: AddItemData = new AddItemData("", "", -1, null);
    tags: string[] = [];
    private supportedFileTypes: string[] = ['image/png', 'image/jpeg'];
    private imageShown: boolean = false;
    private currentImage: string = '';

    constructor(private itemService: ItemService, private loaderService: LoaderService) {

    }

    ngOnInit() {

    }

    addItem() {
        this.loaderService.display(true);
        this.itemService.addItem(this.model)
            .then((data) => {
                this.model = new AddItemData("", "", -1, null);
                this.currentImage = '';
                this.imageShown = false;
                this.loaderService.display(false);
                this.showNotification("bottom", "center", "Товар успешно добавлен!", "success");
                this.onAddItemEvent.emit(data);
            })
            .catch((err) => {
                this.showNotification("bottom", "center", "Произошла ошибка добавления!", "danger");
            });
    }

    private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
        this.model.picture = acceptedFile.file;
        this.readFile(this.model.picture);
    }

    onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        this.model.picture = files[0];

        this.readFile(this.model.picture);
    }
    readFile(file: File) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            this.currentImage = fileReader.result;
            this.imageShown = true;
        };

        fileReader.readAsDataURL(this.model.picture);
    }

    showNotification(from, align, message, type) {
        // const type = ['', 'info', 'success', 'warning', 'danger'];

        $.notify({
            icon: "notifications",
            message: message

        }, {
                type: type,
                timer: 4000,
                placement: {
                    from: from,
                    align: align
                }
            });
    }
}
