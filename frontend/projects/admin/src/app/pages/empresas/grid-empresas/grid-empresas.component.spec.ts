import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmpresasComponent } from './grid-empresas.component';

describe('GridEmpresasComponent', () => {
  let component: GridEmpresasComponent;
  let fixture: ComponentFixture<GridEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
