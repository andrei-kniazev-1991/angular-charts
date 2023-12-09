import {Directive, Input, HostBinding, ElementRef, Renderer2, OnInit, HostListener} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appDisableButton]'
})
export class DisableButtonDirective implements OnInit {
  @Input() isViewerDisabled: boolean = false;
  @Input() viewerTooltip: string = 'You do not have sufficient rights';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private tooltip: MatTooltip
  ) { }

  ngOnInit(): void {
    this.tooltip.message = this.viewerTooltip;
  }

  @HostBinding('class.mat-button-disabled') get isDisabled() {
    return this.isViewerDisabled;
  }

  @HostBinding('style.cursor') get cursor() {
    return this.isViewerDisabled ? 'not-allowed' : 'pointer';
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.isViewerDisabled) {
      this.tooltip.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.tooltip.hide();
  }
}
