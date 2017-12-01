import { Component, ViewChild, OnInit } from "@angular/core";

import { LoaderService } from "./../../shared/core/loader.service";
import { NotificationService } from "./../../shared/core/notification.service";
import { OrdersService } from "./../../shared/core/orders.service";

import * as _ from "lodash";
declare const $: any;

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
    orders: any;
    ordering: boolean = true;

    statuses: any = [];

    constructor(
        private ordersService: OrdersService,
        private notificationService: NotificationService,
        private loaderService: LoaderService
    ) {
        this.fillStatuses();
        this.loadOrders();
    }

    ngOnInit() {

    }

    sortOrders(property: string) {
        console.log(property);
        console.log(this.ordering);
        this.ordering = this.ordering ? false : true;
        console.log(this.ordering);
        if(this.ordering)
            this.orders = _.orderBy(this.orders, property, 'asc');
        if(!this.ordering)
            this.orders = _.orderBy(this.orders, property, 'desc');
    }

    loadOrders() {
        this.loaderService.display(true);
        this.ordersService
            .getOrders()
            .then(orders => {
                this.orders = orders;
                this.loaderService.display(false);
                console.log(orders);
                this.sortOrders('id');
            })
            .catch(err => {
                this.loaderService.display(false);
                console.log(err);
            });
    }

    changeStatus(orderId: number, statusId: number) {
        this.loaderService.display(true);
        this.ordersService
        .changeStatus(orderId, statusId)
        .then( () => {
            this.loaderService.display(false);
            let order = _.find(this.orders, ['id', orderId]);
            order.orderState = statusId;
        })
        .catch(err => {
            this.loaderService.display(false);
            console.log(err);
        });
    }

    fillStatuses() {
        this.statuses[0] = {statusRU: "Зарегистрирован", value: 0};
        this.statuses[1] = {statusRU: "Принят", value: 1};
        this.statuses[2] = {statusRU: "Отклонен", value: 2};
        this.statuses[3] = {statusRU: "Готов", value: 3};
        this.statuses[4] = {statusRU: "Выдан", value: 4};
        this.statuses[5] = {statusRU: "Отменен", value: 5};
    }
}
