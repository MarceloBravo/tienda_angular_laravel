import { TestBed } from '@angular/core/testing';

import { LoginAdminService } from './login-admin.service';

describe('LoginAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAdminService = TestBed.get(LoginAdminService);
    expect(service).toBeTruthy();
  });
});
