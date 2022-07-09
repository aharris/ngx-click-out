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

@Component({
  selector: 'app-test-container',
  template: `
    <div>
      <div id="inner-content"
        click-out
        [inEvents]="['mouseenter']"
        (in)="onIn()">
          Inner Content
      </div>
      <div id="outer-content">
        Outer Content

        <input id="outer-input" />
      </div>
    </div>
  `
})
class ContainerCustomInComponent {
  onOut() { }
  onIn() { }
}

describe('ClickOutDirective', () => {
  describe('In - Initializing Triggers', () => {
    let fixture: ComponentFixture<ContainerComponent>;
    let container: ContainerComponent;
    let inEl: HTMLElement;
    let outEl: HTMLElement;

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
      inEl = fixture.debugElement.nativeElement.querySelector('#inner-content');
      outEl = fixture.debugElement.nativeElement.querySelector('#outer-content');
    });

    it('should initialize by default in events - click', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      inEl.click();

      expect(container.onIn).toHaveBeenCalledTimes(1);

      inEl.click();

      expect(container.onIn).toHaveBeenCalledTimes(2);
    });
  });

  xdescribe('In - Custom Triggers', () => {
    let fixture: ComponentFixture<ContainerCustomInComponent>;
    let container: ContainerComponent;
    let inEl: HTMLElement;
    let outEl: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ContainerCustomInComponent, ClickOutDirective],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true
          }
        ]
      });

      fixture = TestBed.createComponent(ContainerCustomInComponent);
      container = fixture.componentInstance;
      inEl = fixture.debugElement.nativeElement.querySelector('#inner-content');
      outEl = fixture.debugElement.nativeElement.querySelector('#outer-content');
    });

    it('should initialize by default in events - click', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      inEl.click();

      expect(container.onIn).toHaveBeenCalledTimes(1);

      inEl.click();

      expect(container.onIn).toHaveBeenCalledTimes(2);
    });
  });

  describe('Out - Triggers', () => {
    let fixture: ComponentFixture<ContainerComponent>;
    let container: ContainerComponent;
    let inEl: HTMLElement;
    let outEl: HTMLElement;

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
      inEl = fixture.debugElement.nativeElement.querySelector('#inner-content');
      outEl = fixture.debugElement.nativeElement.querySelector('#outer-content');
    });

    it('should have default trigger events - click', () => {
      inEl.click();

      spyOn(container, 'onOut');

      expect(container.onOut).not.toHaveBeenCalled();

      outEl.click();

      expect(container.onOut).toHaveBeenCalledTimes(1);

      inEl.click();
      outEl.click();

      expect(container.onOut).toHaveBeenCalledTimes(2);
    });

    it('should have default trigger events - focusin', () => {
      inEl.click();

      spyOn(container, 'onOut');

      fixture.debugElement.nativeElement.querySelector('#outer-input')
        .dispatchEvent(new Event('focusin', {
          'bubbles': true
        }));

      expect(container.onOut).toHaveBeenCalled();
    });

    it('should have default trigger events - touchstart', () => {
      inEl.click();

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
    let inEl: HTMLElement;
    let outEl: HTMLElement;

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
      inEl = fixture.debugElement.nativeElement.querySelector('#inner-content');
      outEl = fixture.debugElement.nativeElement.querySelector('#outer-content');

    });

    it('should have custom trigger events', () => {
      inEl.click();

      spyOn(container, 'onOut');

      expect(container.onOut).not.toHaveBeenCalled();

      outEl
        .dispatchEvent(new MouseEvent('click', {
          'bubbles': true
        }));

      expect(container.onOut).not.toHaveBeenCalled();

      outEl
        .dispatchEvent(new MouseEvent('mouseenter', {
          'bubbles': true
        }));

      expect(container.onOut).toHaveBeenCalled();
    });
  });
});
