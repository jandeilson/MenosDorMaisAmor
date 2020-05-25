import { Component, Input } from '@angular/core';

@Component({
  selector: 'date-modal',
  templateUrl: './date-modal.component.html'
})
export class DateModalComponent {
  
  @Input() public data: any;
  
  constructor() { }

}
