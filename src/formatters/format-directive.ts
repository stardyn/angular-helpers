import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {FormatService} from "./format-service";


@Directive({
  selector: '[format-value]',
  standalone: true
})
export class FormatDirective implements OnChanges {
  @Input() value: any;
  @Input() format!: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(): void {
    this.el.nativeElement.textContent = FormatService.format(this.value, this.format);
  }
}
