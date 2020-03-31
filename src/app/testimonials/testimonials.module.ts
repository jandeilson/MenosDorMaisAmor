import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FormsModule
  ]
})
export class TestimonialsModule { }
