import { TestBed } from '@angular/core/testing';

import { RidesResolverService } from './rides-resolver.service';

describe('RidesResolverService', () => {
  let service: RidesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
