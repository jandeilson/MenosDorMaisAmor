import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TestimonialsComponent } from './testimonials.component';
import { TestimonialDetailComponent } from './testimonial-detail/testimonial-detail.component';
import { TestimonialNeedyFormComponent } from './testimonial-needy-form/testimonial-needy-form.component';
import { TestimonialHelperFormComponent } from './testimonial-helper-form/testimonial-helper-form.component'
import { CommonButtonComponent } from '../shared/commonButton/common-button.component';

import { BrazilianStatesGQL } from '../graphql/states';
import { DefaultPageComponent } from '../shared/default-page/default-page.component';


@NgModule({
  declarations: [
    TestimonialsComponent,
    TestimonialDetailComponent,
    TestimonialNeedyFormComponent,
    TestimonialHelperFormComponent,
    CommonButtonComponent,
    DefaultPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    BrazilianStatesGQL
  ]
})
export class TestimonialsModule {}
