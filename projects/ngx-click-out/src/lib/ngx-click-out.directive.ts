import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
  OnInit
} from '@angular/core';

@Directive({ selector: '[out]' })
export class ClickOutDirective implements OnInit {
  @Output() in = new EventEmitter<HTMLElement>();
  @Output() out = new EventEmitter<HTMLElement>();

  private eventListener: (event: Event) => void;

  // Todo: allow customization
  private outEvents: string[] = ['click', 'touchstart', 'focusin'];

  constructor(
    private readonly elementRef: ElementRef
  ) { }

  // TODO: allow custom triggers
  @HostListener('click', ['$event.target'])
  @HostListener('touchstart', ['$event.target'])
  @HostListener('focusin', ['$event.target'])
  onClickIn() {
    this.removeEventListeners();

    this.in.emit(this.elementRef.nativeElement);

    this.setUpClickOut(this.elementRef.nativeElement);
  }

  ngOnInit(): void {

  }

  private setUpClickOut(targetElement: HTMLElement): void {
    this.eventListener = (event: Event) => {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);

      if (!clickedInside) {
        this.out.emit(targetElement);

        this.removeEventListeners();
      }
    };

    this.outEvents.forEach((eventName: string) => {
      document.addEventListener(eventName, this.eventListener);
    });
  }

  private removeEventListeners() {
    this.outEvents.forEach((eventName: string) => {
      document.removeEventListener(eventName, this.eventListener);
    });
  }
}
