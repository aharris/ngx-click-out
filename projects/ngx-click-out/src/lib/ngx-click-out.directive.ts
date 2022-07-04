import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({ selector: '[clickOut]' })
export class ClickOutDirective {
  @Output() clickOut = new EventEmitter<HTMLElement>();

  private eventListener: (event: Event) => void;

  // Todo: allow customization
  private events: string[] = ['click', 'touchstart', 'focusin'];

  constructor(
    private readonly elementRef: ElementRef
  ) { }

  // TODO: allow custom triggers
  @HostListener('click', ['$event.target'])
  onClickIn() {
    this.removeEventListeners();

    this.setUpClickOut(this.elementRef.nativeElement);
  }

  private setUpClickOut(targetElement: HTMLElement): void {
    this.eventListener = (event: Event) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);

      if (!clickedInside) {
        this.clickOut.emit(targetElement);

        this.removeEventListeners();
      }
    };

    this.events.forEach((eventName: string) => {
      document.addEventListener(eventName, this.eventListener);
    });
  }

  private removeEventListeners() {
    this.events.forEach((eventName: string) => {
      document.removeEventListener(eventName, this.eventListener);
    });
  }
}
