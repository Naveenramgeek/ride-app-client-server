import { TestBed } from '@angular/core/testing';

import { DriverProfileResolverService } from './driver-profile-resolver.service';

describe('DriverProfileResolverService', () => {
  let service: DriverProfileResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverProfileResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
