import { TestBed } from '@angular/core/testing';

import { AnimatedService } from './animated.service';

describe('AnimatedService', () => {
  let service: AnimatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
