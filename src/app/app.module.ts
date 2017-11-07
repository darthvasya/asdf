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

import { SortPipe } from './shared/pipes/sort.pipe';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, LoaderService, NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
