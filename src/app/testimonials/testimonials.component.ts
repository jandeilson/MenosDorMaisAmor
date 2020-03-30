import { Component, OnInit } from '@angular/core';
import { TestimonialsService } from './testimonials.service';
import { Person } from 'src/app/models/person.model';


@Component({
  selector: 'testimonials',
  templateUrl: './testimonials.component.html'
})

export class TestimonialsComponent implements OnInit {

  public users: Person[];

  constructor(private TestimonialsService: TestimonialsService) {
    this.TestimonialsService.getAllUsers().subscribe(users => this.users = users);
  }

  ngOnInit(): void {
  }

}
