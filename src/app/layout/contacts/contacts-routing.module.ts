import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactsComponent } from "./contacts.component";
import { ContactsService } from "app/shared/core/contacts.service";

const routes: Routes = [{ path: "", component: ContactsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers:[
        ContactsService
    ]
})
export class ContactsRoutingModule {}
