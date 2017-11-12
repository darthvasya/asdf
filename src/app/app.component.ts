import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

declare const $: any;

import { LoaderService } from './shared/core/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showLoader: boolean;

  constructor(public location: Location, private loaderService: LoaderService) { }

  ngOnInit() {
    $.material.options.autofill = true;
    $.material.init();
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
}
