import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxClickOutsideComponent } from './ngx-click-out.component';

describe('NgxClickOutsideComponent', () => {
  let component: NgxClickOutsideComponent;
  let fixture: ComponentFixture<NgxClickOutsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxClickOutsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxClickOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
