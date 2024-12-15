import { TestBed } from '@angular/core/testing';

import { DriverEarningsResolverService } from './driver-earnings-resolver.service';

describe('DriverEarningsResolverService', () => {
  let service: DriverEarningsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverEarningsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
