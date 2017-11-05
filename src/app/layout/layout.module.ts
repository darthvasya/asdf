import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent, SidebarComponent, FooterComponent } from '../shared';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent
    ]
})
export class LayoutModule { }
