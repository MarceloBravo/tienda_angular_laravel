import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridMenusComponent } from './grid-menus.component';

describe('GridMenusComponent', () => {
  let component: GridMenusComponent;
  let fixture: ComponentFixture<GridMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
