import { TestBed } from '@angular/core/testing';

import { ProvinciasService } from './provincias.service';

describe('ProvinciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvinciasService = TestBed.get(ProvinciasService);
    expect(service).toBeTruthy();
  });
});
