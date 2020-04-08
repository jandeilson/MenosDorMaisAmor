import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesFilterComponent } from './states-filter.component';

describe('StatesFilterComponent', () => {
  let component: StatesFilterComponent;
  let fixture: ComponentFixture<StatesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
