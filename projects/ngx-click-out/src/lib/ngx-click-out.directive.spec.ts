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
class ContainerCustomInComponent {
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

  describe('In - Custom Triggers', () => {
    let fixture: ComponentFixture<ContainerCustomInComponent>;
    let container: ContainerComponent;

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
    });

    it('should have custom trigger events', () => {
      spyOn(container, 'onIn')

      expect(container.onIn).not.toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#inner-content')
        .dispatchEvent(new MouseEvent('mouseenter', {
          'bubbles': true
        }));

      expect(container.onIn).toHaveBeenCalled();

      fixture.debugElement.nativeElement.querySelector('#inner-content').click();

      spyOn(container, 'onOut');

      expect(container.onOut).not.toHaveBeenCalled();
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
