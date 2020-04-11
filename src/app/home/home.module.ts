import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryPipe } from './../pipes/summary.pipe';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './../shared/modal-component/modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesFilterComponent } from './filters/states-filter/states-filter.component';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';
import { FiltersComponent } from './filters/filters.component';


@NgModule({
  declarations: [
    HomeComponent,
    ModalComponent,
    SummaryPipe,
    StatesFilterComponent,
    StatesModalComponent,
    FiltersComponent
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
    FiltersComponent
  ],
  entryComponents: [
    StatesFilterComponent
  ]
})
export class HomeModule { }
