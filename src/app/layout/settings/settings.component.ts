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
                this.settings.StartWorkingDayDateTime = this.formatDate(new Date(data["startWorkingDayDateTime"]));
                this.settings.EndWorkingDayDateTime = this.formatDate(new Date(data["endWorkingDayDateTime"]));

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
                this.notificationService.showNotification("bottom", "center", "Успешное обновление настроек!", "success");
                this.loadSettings();
            })
            .catch(err => {
                this.notificationService.showNotification("bottom", "center", "Ошибка обновления настроек!", "danger");
                this.loaderService.display(false);
            });
    }

    formatDate(date) {

        var hh = date.getHours() + 3;
        if(hh > 24) hh = hh - 24;
        if (hh < 10) hh = "0" + hh;

        var mm = date.getMinutes() ;
        if (mm < 10) mm = '0' + mm;

        return hh + ":" + mm ;
    }
}
