import { TestBed } from '@angular/core/testing';

import { NgxClickOutService } from './ngx-click-out.service';

describe('NgxClickOutService', () => {
  let service: NgxClickOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxClickOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
