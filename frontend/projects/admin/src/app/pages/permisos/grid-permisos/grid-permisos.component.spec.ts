import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPermisosComponent } from './grid-permisos.component';

describe('GridPermisosComponent', () => {
  let component: GridPermisosComponent;
  let fixture: ComponentFixture<GridPermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
