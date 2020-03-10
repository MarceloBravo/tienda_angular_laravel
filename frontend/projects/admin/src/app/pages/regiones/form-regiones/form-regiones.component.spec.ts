import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegionesComponent } from './form-regiones.component';

describe('FormRegionesComponent', () => {
  let component: FormRegionesComponent;
  let fixture: ComponentFixture<FormRegionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRegionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRegionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
