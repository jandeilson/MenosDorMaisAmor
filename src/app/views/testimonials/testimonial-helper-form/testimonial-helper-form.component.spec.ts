import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialHelperFormComponent } from './testimonial-helper-form.component';

describe('TestimonialHelperFormComponent', () => {
  let component: TestimonialHelperFormComponent;
  let fixture: ComponentFixture<TestimonialHelperFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialHelperFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialHelperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
