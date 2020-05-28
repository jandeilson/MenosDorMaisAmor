import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGQLQuery, UserGQLMutation } from '../../../graphql/users';

@Component({
  selector: 'testimonial-helper-form',
  templateUrl: './testimonial-helper-form.component.html',
})
export class TestimonialHelperFormComponent implements OnInit {
  id: number;
  private sub: any;
  needyRequest: boolean = false;
  needyContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserGQLMutation: UserGQLMutation,
    private UserGQLQuery: UserGQLQuery
  ) {}

  submit(f: any) {
    this.UserGQLMutation.mutate({
      firstName: f.form.value.firstName,
      lastName: f.form.value.lastName,
      email: f.form.value.email,
      phone: f.form.value.phone,
      helper: true,
    }).subscribe(() => {
      this.needyRequest = true;
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.UserGQLQuery.watch({
      userId: localStorage.getItem('needyUserId'),
    }).valueChanges.subscribe(({ data, loading }) => {
      this.needyContact = data.userById;
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
