import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[itemsize]'
})
export class ItemSizeDirective {


    @Input() defaultColor: string;
    @Input() user: any;

    constructor(private el: ElementRef) {

    }
}
