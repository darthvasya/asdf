import { Component, ViewChild, OnInit } from "@angular/core";

import { LoaderService } from "./../../shared/core/loader.service";
import { NotificationService } from "./../../shared/core/notification.service";
import { OrdersService } from "./../../shared/core/orders.service";
import { SignalRService } from "./../../shared/core/signalr.service";

import * as _ from "lodash";
declare const $: any;

import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { from } from "rxjs/observable/from";

import { HubConnection, TransportType, HttpConnection } from "@aspnet/signalr-client";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
    orders: any;
    ordering: boolean = true;

    statuses: any = [];

    page = 1;
    pageSize = 10;

    hubConnection: HubConnection;
    httpConnection: HttpConnection;
    nick = "";
    message = "";
    messages: string[] = [];

    constructor(
        private ordersService: OrdersService,
        private notificationService: NotificationService,
        private loaderService: LoaderService //private signalrService: SignalRService
    ) {
        this.fillStatuses();
        this.loadOrders();

        // Observable.interval(2000)
        //     .switchMap(() =>
        //         this.ordersService.getOrder(
        //             this.orders[0].id
        //         )
        //     )
        //     .subscribe(data => {
        //         console.log(data); // see console you get output every 5 sec
        //     });
    }

    ngOnInit() {
        this.httpConnection = new HttpConnection('https://suvorov.co/ordersHub');
        this.hubConnection = new HubConnection(this.httpConnection);
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started!');
                // Тут вместо 1 надо отправить id магаза
                this.hubConnection.invoke("registerConnection", 1)
            })
            .catch(err =>
                console.log('Error while establishing connection :(')
            );

            this.hubConnection.on("newOrder", data => {
                // обработка заказа
                console.log(data);
            });

            this.hubConnection.on("Heartbeat", data => {
                // обработка заказа
                console.log("heartBeat: ", data);
            });

            this.hubConnection.onclose(() => {
                console.log("ws closed");
            })
    }


    sendMessage() {
        // this.hubConnection
        //     .invoke('sendToAll', 'Vasya', 'dadsasadsad')
        //     .catch(err => console.error(err));
    }

    sortOrders(property: string) {
            this.sendMessage();
        console.log(property);
        console.log(this.ordering);
        this.ordering = this.ordering ? false : true;
        console.log(this.ordering);
        if (this.ordering)
            this.orders = _.orderBy(this.orders, property, "asc");
        if (!this.ordering)
            this.orders = _.orderBy(this.orders, property, "desc");
    }

    loadOrders() {
        this.loaderService.display(true);
        this.ordersService
            .getOrders(this.page, this.pageSize)
            .then(orders => {
                this.orders = orders;
                this.loaderService.display(false);
                console.log(orders);
                // ..this.sortOrders("id");
                this.getOrder();
            })
            .catch(err => {
                this.loaderService.display(false);
                console.log(err);
            });
    }

    getOrder() {
        if (this.orders.length > 0) {
            let lastId = this.orders[this.orders.length - 1].id;
            console.log(lastId);
        }
    }

    changeStatus(orderId: number, statusId: number) {
        this.loaderService.display(true);
        this.ordersService
            .changeStatus(orderId, statusId)
            .then(() => {
                this.loaderService.display(false);
                let order = _.find(this.orders, ["id", orderId]);
                order.orderState = statusId;
            })
            .catch(err => {
                this.loaderService.display(false);
                console.log(err);
            });
    }

    fillStatuses() {
        this.statuses[0] = { statusRU: "Получен", value: 0 };
        this.statuses[1] = { statusRU: "Принят", value: 1 };
        this.statuses[2] = { statusRU: "Отклонен", value: 2 };
        this.statuses[3] = { statusRU: "Готов", value: 3 };
        this.statuses[4] = { statusRU: "Выдан", value: 4 };
        this.statuses[5] = { statusRU: "Отменен", value: 5 };
    }

    getNextOrders() {
        this.page += 1;
        this.loadOrders();
    }

    getPastOrders() {
        if (this.page >= 2) {
            this.page -= 1;
            this.loadOrders();
        }
    }
}
