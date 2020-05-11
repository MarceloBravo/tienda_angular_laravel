import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCiudadesComponent } from './grid-ciudades.component';

describe('GridCiudadesComponent', () => {
  let component: GridCiudadesComponent;
  let fixture: ComponentFixture<GridCiudadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridCiudadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCiudadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
