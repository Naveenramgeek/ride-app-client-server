import { TestBed } from '@angular/core/testing';

import { RiderPaymentsResolverService } from './rider-payments-resolver.service';

describe('RiderPaymentsResolverService', () => {
  let service: RiderPaymentsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderPaymentsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
