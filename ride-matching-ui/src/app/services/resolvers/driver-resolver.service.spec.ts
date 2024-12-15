import { TestBed } from '@angular/core/testing';

import { DriverResolverService } from './driver-resolver.service';

describe('DriverResolverService', () => {
  let service: DriverResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
