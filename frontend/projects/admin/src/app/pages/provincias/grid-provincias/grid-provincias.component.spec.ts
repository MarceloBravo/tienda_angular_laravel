import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProvinciasComponent } from './grid-provincias.component';

describe('GridProvinciasComponent', () => {
  let component: GridProvinciasComponent;
  let fixture: ComponentFixture<GridProvinciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridProvinciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
