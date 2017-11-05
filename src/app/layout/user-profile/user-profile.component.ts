import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    user: any;
    name: string;
    constructor() {
        this.user = { name: "Vasya", age: 20 };
        this.name = "VAsya";
    }

    ngOnInit() {

    }

}
