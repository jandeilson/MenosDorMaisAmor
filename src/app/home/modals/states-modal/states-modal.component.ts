import { Component, Input } from '@angular/core';

@Component({
  selector: 'states-modal',
  templateUrl: './states-modal.component.html'
})
export class StatesModalComponent {
  
  @Input() public data: any;
  
  constructor() { }

}
