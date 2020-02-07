import { TestBed } from '@angular/core/testing';

import { WebpayService } from './webpay.service';

describe('WebpayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebpayService = TestBed.get(WebpayService);
    expect(service).toBeTruthy();
  });
});
