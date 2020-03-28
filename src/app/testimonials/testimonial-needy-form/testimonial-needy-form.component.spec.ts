import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialNeedyFormComponent } from './testimonial-needy-form.component';

describe('TestimonialNeedyFormComponent', () => {
  let component: TestimonialNeedyFormComponent;
  let fixture: ComponentFixture<TestimonialNeedyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialNeedyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialNeedyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
