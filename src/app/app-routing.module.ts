import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultPageComponent } from './shared/default-page/default-page.component';
import { TestimonialsComponent } from './views/testimonials/testimonials.component'
import { TestimonialNeedyFormComponent } from './views/testimonials/testimonial-needy-form/testimonial-needy-form.component'
import { TestimonialDetailComponent } from './views/testimonials/testimonial-detail/testimonial-detail.component';
import { TestimonialHelperFormComponent } from './views/testimonials/testimonial-helper-form/testimonial-helper-form.component';
import { HomeComponent } from './views/home/home.component'
import { ThanksComponent } from './views/thanks/thanks.component';
import { HowItWorksComponent } from './views/howitworks/howitworks.component';

const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'testimonial', component: DefaultPageComponent, 
    children: [
      { path: 'create', component: TestimonialNeedyFormComponent },
      { path: 'thanks', component: ThanksComponent },
      { path: ':id', component: TestimonialDetailComponent },
      { path: ':id/helper', component: TestimonialHelperFormComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
