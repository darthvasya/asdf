import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { SettingsService } from "./../../shared/core/settings.service";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";

@NgModule({
    imports: [CommonModule, SettingsRoutingModule, FormsModule],
    declarations: [SettingsComponent],
    providers: [SettingsService]
})
export class SettingsModule {}
