import { TestBed } from '@angular/core/testing';

import { ValidaRutService } from './valida-rut.service';

describe('ValidaRutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidaRutService = TestBed.get(ValidaRutService);
    expect(service).toBeTruthy();
  });
});
