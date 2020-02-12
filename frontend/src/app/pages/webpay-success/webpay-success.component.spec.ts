import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpaySuccessComponent } from './webpay-success.component';

describe('WebpaySuccessComponent', () => {
  let component: WebpaySuccessComponent;
  let fixture: ComponentFixture<WebpaySuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpaySuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpaySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
