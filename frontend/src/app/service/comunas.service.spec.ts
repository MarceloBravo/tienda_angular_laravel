import { TestBed } from '@angular/core/testing';

import { ComunasService } from './comunas.service';

describe('ComunasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComunasService = TestBed.get(ComunasService);
    expect(service).toBeTruthy();
  });
});
