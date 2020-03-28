import { Component, OnInit } from '@angular/core';
import { Flickity } from 'flickity/js/index';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  
  
  testimonialsCarousel () {
    const elem = document.getElementById('testimonials-carousel');
    
    const flkty = new Flickity(elem, {
      cellAlign: 'left',
      contain: true
    });
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
