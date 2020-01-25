import { TestBed } from '@angular/core/testing';

import { CiudadesService } from './ciudades.service';

describe('CiudadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CiudadesService = TestBed.get(CiudadesService);
    expect(service).toBeTruthy();
  });
});
