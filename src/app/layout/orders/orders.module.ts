import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OrdersService } from "./../../shared/core/orders.service";
import { SignalRService } from "./../../shared/core/signalr.service";

import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "app/layout/orders/orders-routing.module";

@NgModule({
    imports: [CommonModule, OrdersRoutingModule, FormsModule],
    declarations: [OrdersComponent],
    providers: [OrdersService, SignalRService]
})
export class OrdersModule {}
