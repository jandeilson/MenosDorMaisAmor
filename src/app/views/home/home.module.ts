import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SummaryPipe } from '../../pipes/summary.pipe';

import { ModalComponent } from '../../shared/modal-component/modal.component';
import { HomeComponent } from './home.component';
import { StatesFilterModalComponent } from './filters/states-filter-modal/states-filter-modal.component';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';
import { DateFilterModalComponent } from './filters/date-filter-modal/date-filter-modal.component';
import { DateModalComponent } from './modals/date-modal/date-modal.component';
import { InterestedButtonComponent } from '../../shared/interestedButton/interested-button.component';
import { FeedbackModalComponent } from './modals/feedback-modal/feedback-modal.component';

import { InterestsGQL } from '../../graphql/interests';
import { StatesFilter } from './filters/states-filter/states-filter.component';
import { FiltersHomeComponent } from './filters/filters-home/filters-home.component';

@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,
    SummaryPipe,
    StatesFilterModalComponent,
    StatesModalComponent,
    DateFilterModalComponent,
    DateModalComponent,
    FeedbackModalComponent,
    StatesFilter,
    FiltersHomeComponent,
    InterestedButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgbModule,
  ],
  providers: [NgbActiveModal, FiltersHomeComponent, StatesFilter, InterestsGQL],
  entryComponents: [StatesFilterModalComponent],
})
export class HomeModule {}
