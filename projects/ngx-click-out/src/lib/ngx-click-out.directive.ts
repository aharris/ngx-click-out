import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
} from '@angular/core';

interface ClickInOut {
  event: Event;
  targetElement: HTMLElement
}

@Directive({ selector: '[click-out]' })
export class ClickOutDirective {
  @Input() outEvents: string[] = ['click', 'touchstart', 'focusin'];

  @Output() in = new EventEmitter<ClickInOut>();
  @Output() out = new EventEmitter<ClickInOut>();

  private outEventListener: (event: Event) => void;

  constructor(
    private readonly elementRef: ElementRef
  ) {}

  @HostListener('click', ['$event.target'])
  onClickInside(event: Event) {
      this.in.emit({
        event,
        targetElement: this.elementRef.nativeElement
      });

      this.removeOutEventListeners();

      this.setUpClickOut(this.elementRef.nativeElement);
  }

  private setUpClickOut(targetElement: HTMLElement): void {
    this.outEventListener = (event: Event) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);

      if (!clickedInside) {
        this.out.emit({
          event,
          targetElement
        });

        this.removeOutEventListeners();
      }
    };

    this.outEvents.forEach((eventName: string) => {
      document.addEventListener(eventName, this.outEventListener);
    });
  }

  private removeOutEventListeners() {
    this.outEvents.forEach((eventName: string) => {
      document.removeEventListener(eventName, this.outEventListener);
    });
  }
}
