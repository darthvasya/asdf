import { Component, ViewChild, OnInit,Injectable, Inject, ElementRef, AfterViewInit } from "@angular/core";

import { LoaderService } from "./../../shared/core/loader.service";
import { NotificationService } from "./../../shared/core/notification.service";
import { OrdersService } from "./../../shared/core/orders.service";
import { SignalRService } from "./../../shared/core/signalr.service";
import { HelperService } from "./../../shared/core/helper.service";

import { APP_CONFIG } from "../../shared/configs/app.config";

import { PushNotificationComponent } from "./../../shared/components/push/push";

import * as _ from "lodash";
declare const $: any;

import "rxjs/Rx";
import { Observable } from "rxjs/Rx";
import { from } from "rxjs/observable/from";

import { HubConnection, TransportType, HttpConnection } from "@aspnet/signalr-client";
import { AuthService } from "app/shared/core/auth.service";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
    orders: any;
    ordering: boolean = true;
    currentPredicate: any;

    notification = new PushNotificationComponent();

    audio: any;

    statuses: any = [];
    filterModel: any = {
        all: true,
        onlyToday: true,
        isReady: true,
        pageSize: 15
    };

    page = 1;

    hubConnection: HubConnection;
    httpConnection: HttpConnection;
    messages: string[] = [];

    constructor(
        @Inject(APP_CONFIG) private config: any,
        private ordersService: OrdersService,
        private notificationService: NotificationService,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private authService: AuthService
    ) {
        this.fillStatuses();
        this.loadOrders();
    }

    ngOnInit() {

        this.notification.title = "Ubot - Менеджер";
        this.notification.body = "Получен новый заказ!!!";
        this.notification.icon = "./../assets/img/cat.jpg";
        this.notification.onClick.subscribe(() => {
            window.open("https://ubot-beta.herokuapp.com/orders");
        });

        this.httpConnection = new HttpConnection(
            `${this.config.endpoint}/ordersHub`
        );
        this.hubConnection = new HubConnection(this.httpConnection);
        this.hubConnection
            .start()
            .then(() => {
                console.log("Connection started!");
                // Тут вместо 1 надо отправить id магаза
                this.hubConnection.invoke(
                    "registerConnection",
                    this.authService.userData.shopId
                );
            })
            .catch(err =>
                console.log("Error while establishing connection :((")
            );

        this.hubConnection.on("newOrder", data => {
            // обработка заказа

            if (this.orders.length >= this.filterModel.pageSize) {
                this.orders.splice(-1, 1);
            }
            data.orderRegisterTime = Date.now();
            this.orders.push(data);
            this.ordering = true;
            this.sortOrders("id");
            this.notificationService.showNotification(
                "bottom",
                "center",
                "Получен новый заказ!",
                "success"
            );

            this.audio = new Audio();
            this.audio.src = "./../assets/audio/ring.mp3";
            this.audio.load();
            // auto-start
            this.audio.play();
            this.notification.show();
        });

        this.hubConnection.on("Heartbeat", data => {
            // обработка заказа
            console.log("heartBeat: ", data);
        });

        this.hubConnection.onclose(() => {
            console.log("ws closed");
        });
    }

    ngOnDestroy() {
        this.httpConnection.stop();
    }

    sortOrders(property: string) {
        this.ordering = this.ordering ? false : true;

        if (this.ordering)
            this.orders = _.orderBy(this.orders, property, "asc");
        if (!this.ordering)
            this.orders = _.orderBy(this.orders, property, "desc");
    }

    loadOrders() {
        this.filterModel.pageSize =
            this.filterModel.pageSize >= 5 ? this.filterModel.pageSize : 5;
        this.loaderService.display(true);
        this.ordersService
            .getOrders(this.page, this.filterModel.pageSize, false, false)
            .then(orders => {
                this.orders = orders;
                this.ordering = true;
                this.sortOrders("id");
                this.loaderService.display(false);
            })
            .catch(err => {
                this.loaderService.display(false);
            });
    }

    changeStatus(orderId: number, statusId: number, waitingTime: number) {
        this.loaderService.display(true);
        if (statusId !== 1) waitingTime = -1;

        this.ordersService
            .changeStatus(orderId, statusId, waitingTime)
            .then(() => {
                this.loaderService.display(false);
                let order = _.find(this.orders, ["id", orderId]);
                order.orderState = statusId;

                if (statusId === 1) {
                    order.orderAcceptTime = new Date();
                    order.orderReadyTime = null;
                }

                if (statusId === 2) {
                    order.orderReadyTime = null;
                    order.orderIssuedTime = null;
                    order.orderAcceptTime = null;
                }

                if (statusId === 3) order.orderReadyTime = new Date();
                if (statusId === 4) order.orderIssuedTime = new Date();
            })
            .catch(err => {
                this.loaderService.display(false);
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
        if (this.orders.length === this.filterModel.pageSize) {
            this.page += 1;
            this.loadOrders();
        }
    }

    getPastOrders() {
        if (this.page >= 2) {
            this.page -= 1;
            this.loadOrders();
        }
    }

    isDate(value) {
        if (isNaN(value.getTime()))
            return false; //date is invalid
        else return value instanceof Date;
    }
}
