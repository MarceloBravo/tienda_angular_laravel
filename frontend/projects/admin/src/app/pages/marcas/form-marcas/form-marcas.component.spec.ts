import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMarcasComponent } from './form-marcas.component';

describe('FormNarcasComponent', () => {
  let component: FormMarcasComponent;
  let fixture: ComponentFixture<FormMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
