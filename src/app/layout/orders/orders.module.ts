import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "app/layout/orders/orders-routing.module";

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule {}
