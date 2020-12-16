import { TestBed } from '@angular/core/testing';

import { MoodAlgorithmService } from './mood-algorithm.service';

describe('MoodAlgorithmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoodAlgorithmService = TestBed.get(MoodAlgorithmService);
    expect(service).toBeTruthy();
  });
});
