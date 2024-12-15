import { TestBed } from '@angular/core/testing';

import { DriverBookingsResolverService } from './driver-bookings-resolver.service';

describe('DriverBookingsResolverService', () => {
  let service: DriverBookingsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverBookingsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
