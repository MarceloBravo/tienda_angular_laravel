import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProvinciasComponent } from './form-provincias.component';

describe('FormProvinciasComponent', () => {
  let component: FormProvinciasComponent;
  let fixture: ComponentFixture<FormProvinciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProvinciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
