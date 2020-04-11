import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'states-filter',
  templateUrl: './states-filter.component.html',
  styleUrls: ['../../../../assets/scss/components/home/modal.scss']
})
export class StatesFilterComponent implements OnInit {

  @Input() public data: any;

  passBack(event){
    //const stateId = event.target.getAttribute('state-id');
    const stateName = event.target.textContent;
    this.activeModal.close(stateName);
  }
  
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    //console.log(this.data)
  }

}
