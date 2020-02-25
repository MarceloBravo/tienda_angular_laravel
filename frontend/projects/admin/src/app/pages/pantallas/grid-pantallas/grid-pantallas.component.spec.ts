import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPantallasComponent } from './grid-pantallas.component';

describe('GridPantallasComponent', () => {
  let component: GridPantallasComponent;
  let fixture: ComponentFixture<GridPantallasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPantallasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
