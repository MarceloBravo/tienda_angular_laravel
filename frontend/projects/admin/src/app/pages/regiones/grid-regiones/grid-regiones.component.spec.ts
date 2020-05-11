import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRegionesComponent } from './grid-regiones.component';

describe('GridRegionesComponent', () => {
  let component: GridRegionesComponent;
  let fixture: ComponentFixture<GridRegionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRegionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRegionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
