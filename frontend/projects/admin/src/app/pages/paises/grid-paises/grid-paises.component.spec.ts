import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPaisesComponent } from './grid-paises.component';

describe('GridPaisesComponent', () => {
  let component: GridPaisesComponent;
  let fixture: ComponentFixture<GridPaisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPaisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
