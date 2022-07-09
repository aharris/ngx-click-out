import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';

interface ClickInOut {
  event: Event;
  targetElement: HTMLElement
}

@Directive({ selector: '[click-out]' })
export class ClickOutDirective implements OnInit, OnDestroy {
  @Input() inEvents: string[] = ['click'];
  @Input() outEvents: string[] = ['click', 'touchstart', 'focusin'];

  @Output() in = new EventEmitter<ClickInOut>();
  @Output() out = new EventEmitter<ClickInOut>();

  private outEventListener: (event: Event) => void;
  private inEventListener: (event: Event) => void;

  constructor(
    private readonly elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.inEvents.forEach((eventName: string) => {
      this.inEventListener = this.renderer.listen(this.elementRef.nativeElement, eventName, e => this.onClickInside(e));
    });
  }

  ngOnDestroy(): void {
    this.removeInEventListeners();
  }

  private onClickInside(event: Event) {
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

  private removeInEventListeners() {
    this.inEvents.forEach((eventName: string) => {
      document.removeEventListener(eventName, this.inEventListener);
    });
  }
}
