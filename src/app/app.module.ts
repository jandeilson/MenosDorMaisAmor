import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TestimonialsModule } from './views/testimonials/testimonials.module';
import { HomeModule } from './views/home/home.module';
import { LayoutModule } from './layout/layout.module';

import { GraphQLModule } from './graphql.module';

import { AppComponent } from './app.component';
import { ThanksComponent } from './views/thanks/thanks.component';


@NgModule({
  declarations: [
    AppComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    TestimonialsModule,
    HomeModule,
    LayoutModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 