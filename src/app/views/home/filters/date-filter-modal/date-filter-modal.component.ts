import { Component } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'date-filter-modal',
  templateUrl: './date-filter-modal.component.html',
  styleUrls: ['../../../../../assets/scss/components/home/modal.scss']
})
export class DateFilterModalComponent {

  model: NgbDateStruct;

  constructor(public activeModal: NgbActiveModal,  public calendar: NgbCalendar) {
    const datePicked = localStorage.getItem('datePicked');
    
    if (datePicked === undefined || datePicked === null || datePicked.length === 0) this.model = calendar.getToday() 
    else this.model = this.fromModel(datePicked);
  }

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }

  selectedDate() {
    localStorage.setItem('datePicked', this.toModel(this.model));
    this.activeModal.close(this.toModel(this.model));
  }
  
}