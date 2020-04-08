import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { queryUsersAndTestimonails } from '../graphql/home'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesModalComponent } from './modals/states-modal/states-modal.component';


@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  filterByStates() {
    const modalRef = this.modalService.open(StatesModalComponent);
    modalRef.componentInstance.title = 'State Filter';
  }

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
      1000:{ items:6 }
    },
  }

  public users: any[];
 
  loading: boolean = true;
  testimonialsCarousel: any;
  mClick: number;

  mClickEvent(i) {
    this.mClick = i;
  }
  constructor(private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: queryUsersAndTestimonails
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
