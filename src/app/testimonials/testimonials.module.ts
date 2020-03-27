import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialDetailComponent } from './testimonial-detail/testimonial-detail.component';
import { TestimonialsComponent } from './testimonials.component';



@NgModule({
  declarations: [
    TestimonialsComponent,
    TestimonialDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestimonialsModule { }
