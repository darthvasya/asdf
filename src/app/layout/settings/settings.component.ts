import { Component, OnInit } from "@angular/core";

import { LoaderService } from "./../../shared/core/loader.service";
import { NotificationService } from "./../../shared/core/notification.service";

import { SettingsService } from "./../../shared/core/settings.service";

import { Settings } from "./../../shared/models/Settings"

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
    settings = new Settings(null, null, "");

    constructor(
        private settingsService: SettingsService,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) {
        this.loadSettings();
    }

    ngOnInit() {

    }

    loadSettings() {
        this.loaderService.display(true);
        this.settingsService
            .getSettings()
            .then(data => {
                this.settings.ManagerPhone = data["managerPhone"];
                this.settings.StartWorkingDayDateTime = new Date(data["startWorkingDayDateTime"]).getHours() + 3 + ":" + new Date(data["startWorkingDayDateTime"]).getMinutes();
                this.settings.EndWorkingDayDateTime = new Date(data["endWorkingDayDateTime"]).getHours() + 3 + ":" + new Date(data["endWorkingDayDateTime"]).getMinutes();

                this.loaderService.display(false);
            })
            .catch(err => {
                this.notificationService.showNotification("bottom", "center", "Ошибка получения настроек!", "danger");
                this.loaderService.display(false);
            });
    }

    updateSettings() {
        if (this.settings.StartWorkingDayDateTime) {
            this.settings.StartWorkingDayDateTime = new Date(2018, 1, 1, this.settings.StartWorkingDayDateTime.split(":")[0], this.settings.StartWorkingDayDateTime.split(":")[1], 0);
        }
        if (this.settings.EndWorkingDayDateTime) {
            this.settings.EndWorkingDayDateTime = new Date(2018, 1, 1, this.settings.EndWorkingDayDateTime.split(":")[0], this.settings.EndWorkingDayDateTime.split(":")[1], 0);
        }

        console.log(this.settings);

        this.loaderService.display(true);
        this.settingsService
            .updateSettings(this.settings)
            .then(data => {
                this.loaderService.display(false);
                this.notificationService.showNotification("bottom", "center", "Успешное обновленияъе настроек!", "success");
                this.loadSettings();
            })
            .catch(err => {
                this.notificationService.showNotification("bottom", "center", "Ошибка обновления настроек!", "danger");
                this.loaderService.display(false);
            });
    }
}
