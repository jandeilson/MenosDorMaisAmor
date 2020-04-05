import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
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
    nav: false,
    responsive: {
      0:{ items: 2 },
      600:{ items:3 },
      1000:{ items:5 }
    },
  }

  public users: any[];
  
  loading: boolean = true;
  testimonialsCarousel: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: gql`
        {
          userMany {
            _id
            firstName
            lastName
            email
            phone
          }
          testimonialMany {
            user
            text
            state
            city
          }
        }
        `
      })
      .subscribe(
        ({ data, loading }) => {
          const usersQuery = data.userMany;
          const testimonialsQuery = data.testimonialMany;
         
          this.loading = loading;

          const m = new Map();
          
          usersQuery.forEach((x:any) => {
            x.testimonial; 
            m.set(x._id, x);
          });
          
          testimonialsQuery.forEach((x:any) => {
            let existing = m.get(x.user);
            
            if (existing === undefined) 
              m.set(x.user, x);
            else 
              Object.assign(existing, { testimonial: [x] });
          });

          this.users = usersQuery;
        }
      );
  }

}
