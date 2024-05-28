import { TestBed } from '@angular/core/testing';

import { FormsResolverService } from './forms-resolver.service';

describe('FormsResolverService', () => {
  let service: FormsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
