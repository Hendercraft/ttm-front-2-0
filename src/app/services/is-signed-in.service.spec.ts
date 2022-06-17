import { TestBed } from '@angular/core/testing';

import { IsSignedInService } from './is-signed-in.service';

describe('IsSignedInService', () => {
  let service: IsSignedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsSignedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
