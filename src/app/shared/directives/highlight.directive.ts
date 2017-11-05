import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[myHighlight]'
  })
export class HighlightDirective {
    el: any;

    @Input('myHighlight') highlightColor: string;
    @Input() defaultColor: string;
    @Input() user: any;

    constructor(el: ElementRef) {
        this.el = el;
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
        this.user.age += 2;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.user.age -= 1;
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = this.defaultColor;
    }
}
