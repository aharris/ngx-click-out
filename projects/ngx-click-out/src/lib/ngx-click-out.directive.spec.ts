import { Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { ClickOutDirective } from './ngx-click-out.directive';

@Component({
  selector: 'app-test-container',
  template: `
    <div>
      <div id="inner-content"
        (in)="onIn()"
        (out)="onOut()">
          Inner Content
      </div>
      <div id="outer-content">
        Outer Content

        <input id="outer-input" />
      </div>
    </div>
  `
})
class ContainerComponent {
  onOut() { }
  onIn() { }
}

describe('ClickOutDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let container: ContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, ClickOutDirective],
      providers: [
        {
          provide: ComponentFixtureAutoDetect,
          useValue: true
        }
      ]
    });

    fixture = TestBed.createComponent(ContainerComponent);
    container = fixture.componentInstance;
  });

  describe('In - Initializing Triggers', () => {
    it('should initialize by default in events - click', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      expect(container.onIn).toHaveBeenCalled();
    });

    it('should initialize by default in events - focusin', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#inner-content')
        .dispatchEvent(new Event('focusin', {
          'bubbles': true
        }));

      expect(container.onIn).toHaveBeenCalled();
    });

    it('should initialize by default in events - touchstart', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#inner-content')
        .dispatchEvent(new Event('touchstart', {
          'bubbles': true
        }));

      expect(container.onIn).toHaveBeenCalled();
    });
  });

  describe('Out - Triggers', () => {
    it('should have default trigger events - click', () => {
      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      spyOn(container, 'onOut');

      expect(container.onOut).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#outer-content').click();

      expect(container.onOut).toHaveBeenCalled();
    });

    it('should have default trigger events - focusin', () => {
      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      spyOn(container, 'onOut');

      fixture.debugElement.nativeElement.querySelector('#outer-input')
        .dispatchEvent(new Event('focusin', {
          'bubbles': true
        }));

      expect(container.onOut).toHaveBeenCalled();
    });

    it('should have default trigger events - touchstart', () => {
      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      spyOn(container, 'onOut');

      fixture.debugElement.nativeElement.querySelector('#outer-input')
        .dispatchEvent(new Event('touchstart', {
          'bubbles': true
        }));

      expect(container.onOut).toHaveBeenCalled();
    });

    it('should allow custom trigger events', () => {});
  });
});
