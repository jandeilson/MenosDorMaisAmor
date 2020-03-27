import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestimonialsComponent } from './testimonials/testimonials.component'
import { HomeComponent } from './home/home.component'


const routes: Routes = [
  { path: '',  component: HomeComponent }, //{ path: 'home' , component: HomeComponent },
  { path: 'testimonials' , component: TestimonialsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
