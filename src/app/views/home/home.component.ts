import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { queryUsersAndTestimonails } from '../../graphql/home'
import { NgbModal, NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';
import { StatesFilter } from './filters/states-filter/states-filter.component';
import { DateModalComponent } from './modals/date-modal/date-modal.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  users: any[];
  usersCarousel: any[];
  queryUsers: any[];
  loading: boolean = true;
  testimonialsCarousel: any;
  testimonialEvent: any;
  filterActive: any = 'Mais vistos';

  constructor(private apollo: Apollo, private modalService: NgbModal, private StatesFilter: StatesFilter) {}

  filterByStates(event: any, testimonials: any) {
    this.filterActive = event.target.textContent;
    this.StatesFilter.getStates();
    
    const modalRef = this.modalService.open(StatesModalComponent, { centered: true });
    modalRef.componentInstance.data = this.StatesFilter;

    modalRef.result.then((stateName) => {
      if (stateName === 'Todos os estados') {
        this.users = this.queryUsers;
      } else {
        const result = this.queryUsers.filter((result) => result.testimonial.state === stateName);
        this.users = result;
      }

      testimonials.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    });
  }

  filterByDate(event: any, testimonials: any) {
    this.filterActive = event.target.textContent;
    const modalRef = this.modalService.open(DateModalComponent, { centered: true });

    modalRef.result.then((date: string) => {
      const toDate = (date: string) => new Date(date).getDate();
      const result = this.queryUsers.filter((result) => toDate(result.testimonial.createdAt) === toDate(date.replace(/-/g, '/')));
      this.users = result;
      
      testimonials.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    });
  }

  filterByInterests(event: any) {
    this.filterActive = event.target.textContent;
    const usersFiltered = this.queryUsers.sort((a, b) => b.testimonial.interests - a.testimonial.interests);

    this.users = usersFiltered;
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
      0:{ items: 2 },
      600:{ items: 3 },
      1000:{ items: 6 }
    },
  }

  goToTestimonial(i: number) {
    this.testimonialEvent = i;
  }

  ngOnInit(): void {
    
    this.apollo
      .query<any>({
        query: queryUsersAndTestimonails
      })
      .subscribe(
        ({ data, loading }) => {
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
          const usersFiltered = usersQuery.filter((users: any) => users.testimonial);

          this.queryUsers = usersFiltered;
          this.users = usersFiltered;


          const shuffle = (arrParam: any[]): any[] => {
            let arr = arrParam.slice(), length = arr.length, temp, i;

            while(length) {
              i = Math.floor(Math.random() * length--);
              temp = arr[length];
              arr[length] = arr[i];
              arr[i] = temp;
            }
        
            return arr;
          }

          this.usersCarousel = shuffle(usersFiltered).slice(0, 5);
          
          this.users.sort((a, b) => b.testimonial.interests - a.testimonial.interests);

          this.loading = loading;
        }
      );
  }

}
