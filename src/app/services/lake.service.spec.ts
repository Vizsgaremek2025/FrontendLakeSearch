import { TestBed } from '@angular/core/testing';

import { LakeService } from './lake.service';

describe('LakeService', () => {
  let service: LakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
