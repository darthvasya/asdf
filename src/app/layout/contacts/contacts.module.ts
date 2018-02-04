import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsComponent } from "./contacts.component";
import { ContactsService } from '../../shared/core/contacts.service';

@NgModule({
    imports: [CommonModule, ContactsRoutingModule],
    declarations: [ContactsComponent],
    providers:[
        ContactsService
    ]
})
export class ContactsModule {}
