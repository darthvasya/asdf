import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'items', loadChildren: './items/items.module#ItemsModule' },
            { path: 'orders', loadChildren: './orders/orders.module#OrdersModule' },
            { path: 'order-manager', loadChildren: './order-manager/order-manager.module#OrderManagerModule' },
            { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
            { path: 'instruction', loadChildren: './instruction/instruction.module#InstructionModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },

            // { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsModule' },
            // { path: 'table-list', loadChildren: './table-list/table-list.module#TableListModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
