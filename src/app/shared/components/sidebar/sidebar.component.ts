import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [{ path: "/dashboard", title: "Панель управления", icon: "dashboard", class: "" }, { path: "/items", title: "Товары", icon: "store", class: "" }, { path: "/orders", title: "Заказы", icon: "bubble_chart", class: "" }, { path: "/contacts", title: "Контакты", icon: "person", class: "" }];
           // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
           // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
           // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
           // { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
           // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
           // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
