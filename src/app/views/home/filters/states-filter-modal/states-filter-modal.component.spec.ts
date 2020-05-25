import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesFilterModalComponent } from './states-filter-modal.component';

describe('StatesFilterModalComponent', () => {
  let component: StatesFilterModalComponent;
  let fixture: ComponentFixture<StatesFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
