import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  testimonialQuery,
  userQuery,
} from '../../../graphql/detail-testimonial';

@Component({
  selector: 'testimonial-detail',
  templateUrl: './testimonial-detail.component.html',
})
export class TestimonialDetailComponent implements OnInit {
  id: number;
  private sub: any;
  loading: boolean = true;

  testimonial: any;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //TODO optimize this
  getTestimonialUser(testimonial) {
    this.apollo
      .query<any>({
        query: userQuery,
        variables: {
          userId: testimonial.user,
        },
      })
      .subscribe(({ data, loading }) => {
        const user = data.userById;
        Object.assign(user, testimonial);
        this.testimonial = user;
        this.loading = loading;
      });
  }

  goHelp() {
    localStorage.setItem('needyUserId', this.testimonial.user);
    this.router.navigate(['/testimonial', this.id, 'helper']);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.apollo
      .query<any>({
        query: testimonialQuery,
        variables: {
          testimonialId: this.id,
        },
      })
      .subscribe(({ data, loading }) => {
        this.testimonial = data.testimonialById;
        this.getTestimonialUser(this.testimonial);
        this.loading = loading;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
