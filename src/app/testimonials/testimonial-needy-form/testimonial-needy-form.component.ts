import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'testimonial-needy-form',
  templateUrl: './testimonial-needy-form.component.html'
})
export class TestimonialNeedyFormComponent implements OnInit {

  constructor() { }

  submit(f) {
    console.log(f)
  }


  formStep: boolean = false;
  formSteps() {
    this.formStep = !this.formStep;  
  }

  ngOnInit(): void {
  }

}
