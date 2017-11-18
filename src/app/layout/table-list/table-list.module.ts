import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { TableListRoutingModule } from './table-list-routing.module';
import { TableListComponent } from './table-list.component';

@NgModule({
    imports: [
        CommonModule,
        TableListRoutingModule,
    ],
    declarations: [
        TableListComponent
    ]
})
export class TableListModule { }
