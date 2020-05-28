import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TestimonialsComponent } from './testimonials.component';
import { TestimonialDetailComponent } from './testimonial-detail/testimonial-detail.component';
import { TestimonialFormComponent } from './testimonial-form/testimonial-form.component';
import { TestimonialHelperFormComponent } from './testimonial-helper-form/testimonial-helper-form.component';
import { CommonButtonComponent } from '../../shared/commonButton/common-button.component';

import { TestimonialGQL } from '../../graphql/testimonial-form';
import { UserGQLQuery, UserGQLMutation } from './../../graphql/users';
import { BrazilianStatesGQL } from '../../graphql/states';
import { DefaultPageComponent } from '../../shared/default-page/default-page.component';

import { PhonePipe } from './../../pipes/phone.pipe';

@NgModule({
  declarations: [
    TestimonialsComponent,
    TestimonialDetailComponent,
    TestimonialFormComponent,
    TestimonialHelperFormComponent,
    CommonButtonComponent,
    DefaultPageComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    BrazilianStatesGQL,
    TestimonialGQL,
    UserGQLQuery,
    UserGQLMutation,
  ],
})
export class TestimonialsModule {}
