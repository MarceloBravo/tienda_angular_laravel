import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCiudadesComponent } from './form-ciudades.component';

describe('FormCiudadesComponent', () => {
  let component: FormCiudadesComponent;
  let fixture: ComponentFixture<FormCiudadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCiudadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
