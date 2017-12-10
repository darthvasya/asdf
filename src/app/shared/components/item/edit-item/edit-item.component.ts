import { Component, OnInit, Input, Output, EventEmitter, Injectable, Inject  } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Ng2FileDropAcceptedFile,
  Ng2FileDropRejectedFile
} from "ng2-file-drop";

import { APP_CONFIG } from "../../../configs/app.config";

import { UpdateItemModel } from "./../../../models/UpdateItemModel";
import { Picture } from "./../../../models/Picture";
import { PictureModel } from "./../../../models/PictureModel";

import { ItemService } from "./../../../core/item.service";
import { LoaderService } from "./../../../core/loader.service";
import { NotificationService } from "./../../../core/notification.service";

@Component({
  selector: "app-edit-item",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.css"]
})
export class EditItemComponent implements OnInit {
  @Input() item: any;
  @Input() itemImage: any;

  model: UpdateItemModel = new UpdateItemModel(-1, "", "");
  modelPicture: PictureModel = new PictureModel(null);

  public API_ROUTE: string = `${this.config.apiUrl}`;

  public supportedFileTypes: string[] = ["image/png", "image/jpeg"];
  public imageShown: boolean = false;
  public currentImage: string = this.API_ROUTE;
  private pictureIsChanged = false;


  constructor(
    @Inject(APP_CONFIG) private config: any,
    private itemService: ItemService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {

  }

  ngOnInit() {
      this.imageShown = true;
      this.currentImage = this.item.picture.path;
      this.model.Name = this.item.name;
      this.model.Description = this.item.description;
  }

  editItem() {

    this.loaderService.display(true);
    if(this.pictureIsChanged) {
        this.itemService.updatePicture(this.item.id, this.modelPicture.picture)
            .then((data) => {
                this.currentImage = JSON.parse(data["_body"]).path;
                this.itemImage.path = JSON.parse(data["_body"]).path;
            })
            .catch((err) => {
                this.loaderService.display(false);
                this.notificationService.showNotification("bottom", "center", "Произошла ошибка обновления фотографии!", "danger");
            });
    }

    this.model.Id = this.item.id;
    this.itemService.editItem(this.model)
        .then((data) => {
            this.item.description = this.model.Description;
            this.item.name = this.model.Name;

            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Товар успешно изменен!", "success");
        })
        .catch((err) => {
            this.loaderService.display(false);
            this.notificationService.showNotification("bottom", "center", "Произошла ошибка редактирования!", "danger");
        });
  }

  dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    this.modelPicture.picture = acceptedFile.file;
    this.readFile(this.modelPicture.picture);
  }

  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.modelPicture.picture = files[0];

    this.readFile(this.modelPicture.picture);
    this.pictureIsChanged = true;
  }

  readFile(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.currentImage = fileReader.result;
      this.imageShown = true;
    };

    fileReader.readAsDataURL(this.modelPicture.picture);
  }
}
