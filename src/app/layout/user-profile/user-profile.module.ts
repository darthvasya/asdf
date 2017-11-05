import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { HighlightDirective } from './../../shared/directives/highlight.directive';

import { NavbarComponent, SidebarComponent, FooterComponent, ItemSizeComponent } from './../../shared';


@NgModule({
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        Ng2SmartTableModule
    ],
    declarations: [
        UserProfileComponent,
        HighlightDirective,
        ItemSizeComponent
    ]
})
export class UserProfileModule { }
