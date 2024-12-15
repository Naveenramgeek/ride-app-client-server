import { TestBed } from '@angular/core/testing';

import { RiderProfileResolverService } from './rider-profile-resolver.service';

describe('RiderProfileResolverService', () => {
  let service: RiderProfileResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderProfileResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
