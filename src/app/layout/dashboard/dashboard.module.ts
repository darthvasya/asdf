import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { StatisticService } from "./../../shared/core/statistic.service";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
    ],
    declarations: [
        DashboardComponent
    ],
    providers:[
        StatisticService
    ]
})
export class DashboardModule { }
