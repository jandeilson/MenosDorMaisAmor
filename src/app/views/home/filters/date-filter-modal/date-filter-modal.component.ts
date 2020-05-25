import { Component } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-filter-modal',
  templateUrl: './date-filter-modal.component.html',
  styleUrls: ['../../../../../assets/scss/components/home/modal.scss']
})
export class DateFilterModalComponent {

  model: NgbDateStruct;
  date: { year: number, month: number };

  constructor(public activeModal: NgbActiveModal,  public calendar: NgbCalendar) {
    this.model = calendar.getToday();
  }

  selectedDate() {
    this.activeModal.close(this.model);
  }
  
}