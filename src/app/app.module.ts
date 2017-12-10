import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './shared';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoaderService } from './shared/core/loader.service';
import { NotificationService } from './shared/core/notification.service';
import { AuthService } from './shared/core/auth.service';

import { SortPipe } from './shared/pipes/sort.pipe';
import { KeysPipe } from "./shared/pipes/keys.pipe";

import { APP_CONFIG, AppConfig } from "./shared/configs/app.config";

@NgModule({
    declarations: [AppComponent, KeysPipe],
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
    providers: [
        AuthGuard,
        LoaderService,
        NotificationService,
        AuthService,
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
