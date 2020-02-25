import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPantallasComponent } from './form-pantallas.component';
import {} from 'jest';

describe('FormPantallasComponent', () => {
  let component: FormPantallasComponent;
  let fixture: ComponentFixture<FormPantallasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPantallasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
