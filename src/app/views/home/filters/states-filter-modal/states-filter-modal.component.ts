import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'states-filter-modal',
  templateUrl: './states-filter-modal.component.html',
  styleUrls: ['../../../../../assets/scss/components/home/modal.scss']
})
export class StatesFilterModalComponent {

  @Input() data: any;
  @Input() loading: boolean;


  passBack(event: any){
    //const stateId = event.target.getAttribute('state-id');
    const stateName = event.target.textContent;
    this.activeModal.close(stateName);
  }
  
  constructor(public activeModal: NgbActiveModal) { }

}
