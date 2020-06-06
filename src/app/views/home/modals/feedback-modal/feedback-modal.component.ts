import { Component, Input } from '@angular/core';

@Component({
  selector: 'feedback-modal',
  templateUrl: './feedback-modal.component.html',
})
export class FeedbackModalComponent {
  @Input() public data: any;

  constructor() {}
}
