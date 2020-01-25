import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideCartComponent } from './right-side-cart.component';

describe('RightSideCartComponent', () => {
  let component: RightSideCartComponent;
  let fixture: ComponentFixture<RightSideCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSideCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSideCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
