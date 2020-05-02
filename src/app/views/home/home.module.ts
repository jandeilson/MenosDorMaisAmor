import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SummaryPipe } from '../../pipes/summary.pipe';

import { ModalComponent } from '../../shared/modal-component/modal.component';
import { HomeComponent } from './home.component';
import { StatesFilterComponent } from './filters/states-filter/states-filter.component';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';
import { FiltersComponent } from './filters/filters.component';

import { InterestsGQL } from '../../graphql/interests'
import { InterestedButtonComponent } from '../../shared/interestedButton/interested-button.component';

@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,
    SummaryPipe,
    StatesFilterComponent,
    StatesModalComponent,
    FiltersComponent,
    InterestedButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule
  ],
  providers: [
    NgbActiveModal,
    FiltersComponent,
    InterestsGQL
  ],
  entryComponents: [
    StatesFilterComponent
  ]
})
export class HomeModule { }
