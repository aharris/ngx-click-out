import { Component } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { ClickOutDirective } from './click-out.directive';

@Component({
  selector: 'app-test-container',
  template: `
        <div id="parent">
            <div id="inner-content" (clickOut)="handleClick()">
                Inner Content
            </div>
            <div id="outer-content">
                Outer Content
            </div>
        </div>
    `
})
class ContainerComponent {
  handleClick() { }
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

  it('should emit clickOut', () => {
    fixture.debugElement.nativeElement.querySelector('#inner-content').click();

    spyOn(container, 'handleClick');

    expect(container.handleClick).not.toHaveBeenCalled();

    fixture.debugElement.nativeElement.querySelector('#outer-content').click();

    expect(container.handleClick).toHaveBeenCalled();
  });
});
