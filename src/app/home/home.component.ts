import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from './../testimonials/testimonials.service';
import { Person } from '../models/person.model';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: false,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    margin: 30,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
    responsive: {
      0:{
        items:3
      },
      600:{
        items:3
      },
      1000:{
         items:5
      }
    },
  }

  public users: Person[];
  testimonialsCarousel: any;

  constructor(private TestimonialsService: TestimonialsService) {
    this.TestimonialsService.getAllUsers().subscribe(users => this.users = users);
  }

  ngOnInit(): void {
  }

}
