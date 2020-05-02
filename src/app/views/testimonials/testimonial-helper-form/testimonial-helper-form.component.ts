import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGQL } from 'src/app/graphql/testimonial-form';

@Component({
  selector: 'testimonial-helper-form',
  templateUrl: './testimonial-helper-form.component.html'
})
export class TestimonialHelperFormComponent implements OnInit {

  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private userGQL: UserGQL) { }

  submit(f: any) {
    this.userGQL
    .mutate({
      firstName: f.form.value.firstName,
      lastName: f.form.value.lastName,
      email: f.form.value.email,
      phone: f.form.value.phone,
      helper: true
    })
    .subscribe(() => {
      this.router.navigate(['/testimonial/thanks']);
    });

    
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
