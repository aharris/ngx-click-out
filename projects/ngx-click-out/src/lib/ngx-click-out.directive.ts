import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  Input
} from '@angular/core';

@Directive({ selector: '[click-out]' })
export class ClickOutDirective implements OnInit {
  @Input() inEvents: string[] = ['click', 'touchstart', 'focusin'];
  @Input() outEvents: string[] = ['click', 'touchstart', 'focusin'];

  @Output() in = new EventEmitter<HTMLElement>();
  @Output() out = new EventEmitter<HTMLElement>();

  private inEventListener: (event: Event) => void;
  private outEventListener: (event: Event) => void;

  constructor(
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.inEventListener = (event: Event) => {
      console.log('inEventListener: ', event);

      this.removeInEventListeners();

      this.in.emit(this.elementRef.nativeElement);

      this.setUpClickOut(this.elementRef.nativeElement);
    };

    this.inEvents.forEach((eventName: string) => {
      document.addEventListener(eventName, this.inEventListener);
    });
  }

  private setUpClickOut(targetElement: HTMLElement): void {
    this.outEventListener = (event: Event) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);

      if (!clickedInside) {
        this.out.emit(targetElement);

        this.removeOutEventListeners();
      }
    };

    this.outEvents.forEach((eventName: string) => {
      document.addEventListener(eventName, this.outEventListener);
    });
  }

  private removeInEventListeners() {
    this.inEvents.forEach((eventName: string) => {
      document.removeEventListener(eventName, this.inEventListener);
    });
  }

  private removeOutEventListeners() {
    this.outEvents.forEach((eventName: string) => {
      document.removeEventListener(eventName, this.outEventListener);
    });
  }
}
