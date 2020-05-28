import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersHome } from './filters-home.component';

describe('FiltersHome', () => {
  let component: FiltersHome;
  let fixture: ComponentFixture<FiltersHome>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersHome ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
