import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesFilter } from './states-filter.component';

describe('StatesFilter', () => {
  let component: StatesFilter;
  let fixture: ComponentFixture<StatesFilter>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesFilter ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
