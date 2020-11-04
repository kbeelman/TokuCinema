import { TestBed } from '@angular/core/testing';

import { MetatagService } from './metatag.service';

describe('MetatagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetatagService = TestBed.inject(MetatagService);
    expect(service).toBeTruthy();
  });
});
