import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { APP_CONFIG, AppConfig } from "../shared/configs/app.config";

import { AuthService } from "../shared/core/auth.service";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule
    ],
    declarations: [LoginComponent],
    providers: [
        AuthService, 
        { provide: APP_CONFIG, useValue: AppConfig }
    ]
})
export class LoginModule {
}
