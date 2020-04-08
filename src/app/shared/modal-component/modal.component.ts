import { Component, Input, OnInit } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

  @Input() title = `Information`;
  
  static modalService: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}