import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxClickOutComponent } from './ngx-click-out.component';

describe('NgxClickOutComponent', () => {
  let component: NgxClickOutComponent;
  let fixture: ComponentFixture<NgxClickOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxClickOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxClickOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
