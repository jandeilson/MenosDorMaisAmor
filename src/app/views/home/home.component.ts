import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { queryUsersAndTestimonails } from '../../graphql/home';
import { FiltersHomeComponent } from './filters/filters-home/filters-home.component';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackModalComponent } from './modals/feedback-modal/feedback-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  users: any[];
  usersCarousel: any[];
  queryUsers: any[];
  loading = true;
  testimonialEvent: any;
  filterActive = 'f-most-interested';
  carouselOptions: OwlOptions = {
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

  constructor(
    private apollo: Apollo,
    private FiltersHome: FiltersHomeComponent,
    private modalService: NgbModal
  ) {}

  filterByStates(e: MouseEvent, testimonials: any) {
    this.FiltersHome.states(e, testimonials).then(
      ({ active, filtered }: { active: string; filtered: any[] }) => {
        this.filterActive = active;
        this.users = filtered;
      }
    );
  }

  filterByDate(e: MouseEvent, testimonials: any) {
    this.FiltersHome.date(e, testimonials).then(
      ({ active, filtered }: { active: string; filtered: any[] }) => {
        this.filterActive = active;
        this.users = filtered;
      }
    );
  }

  filterByInterests(e: MouseEvent) {
    this.FiltersHome.interests(e).then(
      ({ active, filtered }: { active: string; filtered: any[] }) => {
        this.filterActive = active;
        this.users = filtered;
      }
    );
  }

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
        usersQuery.forEach((obj: any) => m.set(obj._id, obj));

        testimonialsQuery.forEach((obj: any) => {
          Object.assign(m.get(obj.user), { testimonial: obj });
        });

        // Return only users have testimonial
        const usersFiltered = usersQuery.filter(
          (users: any) => users.testimonial
        );
        // Return only approved testimonial
        const onlyApproved = usersFiltered.filter(
          (user: any) => user.testimonial.approved === true
        );

        this.queryUsers = onlyApproved;
        this.users = onlyApproved;

        const shuffle = (arrParam: any[]): any[] => {
          const arr = arrParam.slice();
          let length = arr.length;
          let temp: any;
          let i: number;

          while (length) {
            i = Math.floor(Math.random() * length--);
            temp = arr[length];
            arr[length] = arr[i];
            arr[i] = temp;
          }

          return arr;
        };

        this.usersCarousel = shuffle(onlyApproved).slice(0, 5);

        this.users.sort(
          (a, b) => b.testimonial.interests - a.testimonial.interests
        );

        this.FiltersHome.get({
          data: { filtered: this.users, raw: this.queryUsers },
        });

        this.loading = loading;
      });

    // Feedback
    const feedbackStatus = localStorage.getItem('feedback');
    if (feedbackStatus !== undefined) {
      localStorage.setItem('feedback', 'on');
    }

    if (localStorage.getItem('feedback') === 'on') {
      setInterval(() => {
        if (localStorage.getItem('feedback') !== 'off') {
          const feedbackModal = this.modalService.open(FeedbackModalComponent, {
            centered: true,
          });

          feedbackModal.result.finally(() =>
            localStorage.setItem('feedback', 'off')
          );
        }
      }, 15000);
    }
  }
}
