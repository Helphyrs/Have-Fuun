import { TestBed } from '@angular/core/testing';

import { TreatmentJwtErrorService } from './treatment-jwt-error.service';

describe('TreatmentJwtErrorService', () => {
  let service: TreatmentJwtErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentJwtErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
