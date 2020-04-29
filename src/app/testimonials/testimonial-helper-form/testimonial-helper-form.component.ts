import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'testimonial-helper-form',
  templateUrl: './testimonial-helper-form.component.html'
})
export class TestimonialHelperFormComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  submit(f) {
    console.log(f)
  }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
