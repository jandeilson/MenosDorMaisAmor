import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialsComponent } from './testimonials.component';
import { TestimonialDetailComponent } from './testimonial-detail/testimonial-detail.component';
import { TestimonialNeedyFormComponent } from './testimonial-needy-form/testimonial-needy-form.component';



@NgModule({
  declarations: [
    TestimonialsComponent,
    TestimonialDetailComponent,
    TestimonialNeedyFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestimonialsModule { }
