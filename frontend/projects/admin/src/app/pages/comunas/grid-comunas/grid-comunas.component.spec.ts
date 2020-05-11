import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComunasComponent } from './grid-comunas.component';

describe('GridComunasComponent', () => {
  let component: GridComunasComponent;
  let fixture: ComponentFixture<GridComunasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComunasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComunasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
