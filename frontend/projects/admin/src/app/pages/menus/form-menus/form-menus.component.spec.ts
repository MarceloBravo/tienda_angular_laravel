import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMenusComponent } from './form-menus.component';

describe('FormMenusComponent', () => {
  let component: FormMenusComponent;
  let fixture: ComponentFixture<FormMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
