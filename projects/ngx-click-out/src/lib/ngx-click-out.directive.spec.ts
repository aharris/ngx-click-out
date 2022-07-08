import { Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { ClickOutDirective } from './ngx-click-out.directive';

@Component({
  selector: 'app-test-container',
  template: `
    <div>
      <div id="inner-content"
        click-out
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

@Component({
  selector: 'app-test-container',
  template: `
    <div>
      <div id="inner-content"
        click-out
        [outEvents]="['mouseenter']"
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
class ContainerCustomOutComponent {
  onOut() { }
  onIn() { }
}

describe('ClickOutDirective', () => {
  describe('In - Initializing Triggers', () => {
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

    it('should initialize by default in events - click', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      expect(container.onIn).toHaveBeenCalledTimes(1);

      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      expect(container.onIn).toHaveBeenCalledTimes(2);
    });
  });

  describe('Out - Triggers', () => {
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

    it('should have default trigger events - click', () => {
      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      spyOn(container, 'onOut');

      expect(container.onOut).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#outer-content').click();

      expect(container.onOut).toHaveBeenCalledTimes(1);

      fixture.debugElement.nativeElement.querySelector('#inner-content').click();
      fixture.debugElement.nativeElement.querySelector('#outer-content').click();

      expect(container.onOut).toHaveBeenCalledTimes(2);
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
  });

  describe('Out - Custom Triggers', () => {
    let fixture: ComponentFixture<ContainerComponent>;
    let container: ContainerComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ContainerCustomOutComponent, ClickOutDirective],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true
          }
        ]
      });

      fixture = TestBed.createComponent(ContainerCustomOutComponent);
      container = fixture.componentInstance;
    });

    it('should have custom trigger events', () => {
      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      spyOn(container, 'onOut');

      expect(container.onOut).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#outer-content')
        .dispatchEvent(new MouseEvent('click', {
          'bubbles': true
        }));

      expect(container.onOut).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#outer-content')
        .dispatchEvent(new MouseEvent('mouseenter', {
          'bubbles': true
        }));

      expect(container.onOut).toHaveBeenCalled();
    });
  });
});
