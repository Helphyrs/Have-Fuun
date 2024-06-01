import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { adminArticleResolver } from './admin-article.resolver';

describe('adminArticleResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => adminArticleResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
