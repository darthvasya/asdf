import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { IconsRoutingModule } from './icons-routing.module';
import { IconsComponent } from './icons.component';

@NgModule({
    imports: [
        CommonModule,
        IconsRoutingModule,
    ],
    declarations: [
        IconsComponent
    ]
})
export class IconsModule { }
