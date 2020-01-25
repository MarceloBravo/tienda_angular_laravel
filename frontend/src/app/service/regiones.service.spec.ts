import { TestBed } from '@angular/core/testing';

import { RegionesService } from './regiones.service';

describe('RegionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionesService = TestBed.get(RegionesService);
    expect(service).toBeTruthy();
  });
});
