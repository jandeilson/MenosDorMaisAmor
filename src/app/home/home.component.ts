import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { queryUsersAndTestimonails } from '../graphql/home'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';
import { FiltersComponent } from './filters/filters.component';


@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  public users: any[];
  queryData: any[];
  loading: boolean = true;
  testimonialsCarousel: any;
  testimonialEvent: any;
  filterActive: any;

  constructor(private apollo: Apollo, private modalService: NgbModal, private FiltersComponent: FiltersComponent) {}

  filterByStates(event, testimonials) {
    this.filterActive = event.target.textContent;
    this.FiltersComponent.getStates();
    const modalRef = this.modalService.open(StatesModalComponent, { centered: true });
    modalRef.componentInstance.data = this.FiltersComponent;

    modalRef.result.then((stateName) => {
      const result = this.queryData.filter((result) => {
        if (result.testimonial.state === stateName) 
          return result;
      });
      

      this.users = result;
      testimonials.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
      
    });
  }

  // Owl Carousel options
  customOptions: OwlOptions = {
    loop: false,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    margin: 30,
    pullDrag: true,
    dots: true,
    nav: false,
    responsive: {
      0:{ items: 2 },
      600:{ items:3 },
      1000:{ items:6 }
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


          // Assign testimonial query to users query
          const m = new Map();
          
          usersQuery.forEach((obj: any) => {
            obj.testimonial; 
            m.set(obj._id, obj);
          });
          
          testimonialsQuery.forEach((obj: any) => {
            let object = m.get(obj.user);
            
            if (object === undefined)
              m.set(obj.user, { testimonial: obj });
            else 
              Object.assign(object, { testimonial: obj });
          });

          // Return only users have testimonial
          const usersFiltered = usersQuery.filter((users: any) => users.testimonial);

          // Data from our database
          this.queryData = usersFiltered;
          this.users = usersFiltered;
        
          this.loading = loading;

        }
      );
  }

}
