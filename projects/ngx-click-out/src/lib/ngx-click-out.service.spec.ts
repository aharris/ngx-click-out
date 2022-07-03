import { TestBed } from '@angular/core/testing';

import { NgxClickOutsideService } from './ngx-click-out.service';

describe('NgxClickOutsideService', () => {
  let service: NgxClickOutsideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxClickOutsideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
