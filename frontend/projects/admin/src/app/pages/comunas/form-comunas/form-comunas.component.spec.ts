import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComunasComponent } from './form-comunas.component';

describe('FormComunasComponent', () => {
  let component: FormComunasComponent;
  let fixture: ComponentFixture<FormComunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComunasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
