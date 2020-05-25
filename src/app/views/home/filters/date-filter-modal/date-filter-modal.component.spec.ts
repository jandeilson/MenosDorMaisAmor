import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterModalComponent } from './date-filter-modal.component';

describe('DateFilterModalComponent', () => {
  let component: DateFilterModalComponent;
  let fixture: ComponentFixture<DateFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
