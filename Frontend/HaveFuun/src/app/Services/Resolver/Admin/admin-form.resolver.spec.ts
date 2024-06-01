import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { adminFormResolver } from './admin-form.resolver';

describe('adminFormResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => adminFormResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
