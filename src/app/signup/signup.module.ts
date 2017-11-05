import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { APP_CONFIG, AppConfig } from "../shared/configs/app.config";

import { AuthService } from "../shared/core/auth.service";

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule
  ],
  declarations: [SignupComponent],
  providers: [
    AuthService,
    { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class SignupModule { }
