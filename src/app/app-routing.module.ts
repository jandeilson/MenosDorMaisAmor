import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialsComponent } from './testimonials/testimonials.component'
import { TestimonialNeedyFormComponent } from './testimonials/testimonial-needy-form/testimonial-needy-form.component'
import { HomeComponent } from './home/home.component'
import { TestimonialDetailComponent } from './testimonials/testimonial-detail/testimonial-detail.component';
import { TestimonialHelperFormComponent } from './testimonials/testimonial-helper-form/testimonial-helper-form.component';
import { DefaultPageComponent } from './shared/default-page/default-page.component';



const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'testimonials', component: TestimonialsComponent},
  { path: 'needy', component: DefaultPageComponent, 
    children: [
      {
        path: 'testimonial', component: TestimonialNeedyFormComponent
      }
  ]},
  { path: 'testimonial', component: DefaultPageComponent, 
    children: [ 
      {
        path: ':id', component: TestimonialDetailComponent
      },
      {
        path: ':id/helper', component: TestimonialHelperFormComponent 
      }
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
