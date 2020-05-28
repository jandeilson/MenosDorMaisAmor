import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { queryUsersAndTestimonails } from '../../graphql/home';
import { FiltersHome } from './filters/filters-home/filters-home.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  users: any[];
  usersCarousel: any[];
  queryUsers: any[];
  loading: boolean = true;
  testimonialsCarousel: any;
  testimonialEvent: any;
  filterActive: string = 'f-most-interested';

  constructor(private apollo: Apollo, private filtersHome: FiltersHome) {}

  filterByStates(e: { target: { classList: string[] } }, testimonials: any) {
    this.filtersHome
      .states(e, testimonials)
      .then(({ active, filtered }: { active: string; filtered: any[] }) => {
        this.filterActive = active;
        this.users = filtered;
      });
  }

  filterByDate(e: { target: { classList: string[] } }, testimonials: any) {
    this.filtersHome
      .date(e, testimonials)
      .then(({ active, filtered }: { active: string; filtered: any[] }) => {
        this.filterActive = active;
        this.users = filtered;
      });
  }

  filterByInterests(e: { target: { classList: string[] } }) {
    this.filtersHome
      .interests(e)
      .then(({ active, filtered }: { active: string; filtered: any[] }) => {
        this.filterActive = active;
        this.users = filtered;
      });
  }

  // Owl Carousel options
  customOptions: OwlOptions = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    margin: 30,
    pullDrag: true,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      1000: { items: 6 },
    },
  };

  goToTestimonial(i: number) {
    this.testimonialEvent = i;
  }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: queryUsersAndTestimonails,
      })
      .subscribe(({ data, loading }) => {
        const usersQuery = data.userMany;
        const testimonialsQuery = data.testimonialMany;
        const m = new Map();

        // Assign testimonial query to users query
        usersQuery.forEach((obj: any) => {
          obj.testimonial;
          m.set(obj._id, obj);
        });

        testimonialsQuery.forEach((obj: any) => {
          Object.assign(m.get(obj.user), { testimonial: obj });
        });

        // Return only users have testimonial
        const usersFiltered = usersQuery.filter(
          (users: any) => users.testimonial
        );

        this.queryUsers = usersFiltered;
        this.users = usersFiltered;

        const shuffle = (arrParam: any[]): any[] => {
          let arr = arrParam.slice(),
            length = arr.length,
            temp,
            i;

          while (length) {
            i = Math.floor(Math.random() * length--);
            temp = arr[length];
            arr[length] = arr[i];
            arr[i] = temp;
          }

          return arr;
        };

        this.usersCarousel = shuffle(usersFiltered).slice(0, 5);

        this.users.sort(
          (a, b) => b.testimonial.interests - a.testimonial.interests
        );

        this.filtersHome.get({
          data: { filtered: this.users, raw: this.queryUsers },
        });

        this.loading = loading;
      });
  }
}
