import { TestBed } from '@angular/core/testing';

import { RiderResolverService } from './rider-resolver.service';

describe('RiderResolverService', () => {
  let service: RiderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
