import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultPageComponent } from './shared/default-page/default-page.component';
import { TestimonialsComponent } from './views/testimonials/testimonials.component';
import { TestimonialFormComponent } from './views/testimonials/testimonial-form/testimonial-form.component';
import { TestimonialDetailComponent } from './views/testimonials/testimonial-detail/testimonial-detail.component';
import { TestimonialHelperFormComponent } from './views/testimonials/testimonial-helper-form/testimonial-helper-form.component';
import { HomeComponent } from './views/home/home.component';
import { ThanksComponent } from './views/thanks/thanks.component';
import { PageAboutComponent } from './views/pages/about/about.component';
import { PagePrivacyComponent } from './views/pages/privacy/privacy.component';
import { PageContactComponent } from './views/pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'page',
    component: DefaultPageComponent,
    children: [
      { path: 'about', component: PageAboutComponent },
      { path: 'contact', component: PageContactComponent },
      { path: 'privacy', component: PagePrivacyComponent },
    ],
  },
  { path: 'testimonials', component: TestimonialsComponent },
  {
    path: 'testimonial',
    component: DefaultPageComponent,
    children: [
      { path: 'create', component: TestimonialFormComponent },
      { path: 'thanks', component: ThanksComponent },
      { path: ':id', component: TestimonialDetailComponent },
      { path: ':id/helper', component: TestimonialHelperFormComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
