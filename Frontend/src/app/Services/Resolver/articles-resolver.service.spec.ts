import { TestBed } from '@angular/core/testing';

import { ArticlesResolver } from './articles-resolver.service';

describe('ArticlesResolverService', () => {
  let service: ArticlesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
