import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMarcasComponent } from './grid-marcas.component';

describe('GridMarcasComponent', () => {
  let component: GridMarcasComponent;
  let fixture: ComponentFixture<GridMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
