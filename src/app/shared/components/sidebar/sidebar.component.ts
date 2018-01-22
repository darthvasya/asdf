import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/core/auth.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Панель управления',  icon: 'dashboard', class: '' },
    { path: '/items', title: 'Товары',  icon:'store', class: '' },
    { path: '/orders', title: 'Заказы',  icon:'person', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  exitFromApp() {
    this.authService.logout();
    this.router.navigate(['/login']);
}
}
