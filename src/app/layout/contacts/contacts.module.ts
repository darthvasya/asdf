import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsComponent } from "./contacts.component";
import { ContactsService } from '../../shared/core/contacts.service';

@NgModule({
    imports: [CommonModule, ContactsRoutingModule, FormsModule],
    declarations: [ContactsComponent],
    providers: [ContactsService]
})
export class ContactsModule {}
