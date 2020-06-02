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
import { HowItWorksComponent } from './views/howitworks/howitworks.component';
import { PageAboutComponent } from './views/pages/about/about.component';
import { PagePrivacyComponent } from './views/pages/privacy/privacy.component';
import { PageContactComponent } from './views/pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ThanksComponent,
    HowItWorksComponent,
    PageAboutComponent,
    PagePrivacyComponent,
    PageContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    TestimonialsModule,
    HomeModule,
    LayoutModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
