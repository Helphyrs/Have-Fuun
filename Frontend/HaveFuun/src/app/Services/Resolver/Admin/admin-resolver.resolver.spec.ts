import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { adminResolverResolver } from './admin-resolver.resolver';

describe('adminResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => adminResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
