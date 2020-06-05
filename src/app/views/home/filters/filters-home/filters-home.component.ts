import { Component } from '@angular/core';
import { StatesModalComponent } from '../../modals/states-modal/states-modal.component';
import { StatesFilter } from '../states-filter/states-filter.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateModalComponent } from '../../modals/date-modal/date-modal.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'filters-home',
  template: '',
})
export class FiltersHomeComponent {
  filtered: any[];
  raw: any[];

  constructor(
    private modalService: NgbModal,
    private StatesFilter: StatesFilter
  ) {}

  public get({
    data: { filtered, raw },
  }: {
    data: { filtered: any[]; raw: any[] };
  }) {
    this.filtered = filtered;
    this.raw = raw;
  }

  public states(e: MouseEvent, testimonials: any) {
    return new Promise((resolve, reject) => {
      this.StatesFilter.getStates();

      const modalRef = this.modalService.open(StatesModalComponent, {
        centered: true,
      });
      modalRef.componentInstance.data = this.StatesFilter;

      modalRef.result.then((stateName) => {
        let filtered: any[];

        if (stateName === 'Todos os estados') {
          filtered = this.raw;
        } else {
          const result = this.raw.filter(
            (result) => result.testimonial.state === stateName
          );
          filtered = result;
        }

        testimonials.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });

        resolve({ active: (e.target as HTMLElement).classList[1], filtered });
      });
    });
  }

  public date(e: MouseEvent, testimonials: any) {
    return new Promise((resolve, reject) => {
      const modalRef = this.modalService.open(DateModalComponent, {
        centered: true,
      });

      modalRef.result.then((date: string) => {
        const toDate = (date: string) => new Date(date).getDate();
        const result = this.raw.filter(
          (result) =>
            toDate(result.testimonial.createdAt) ===
            toDate(date.replace(/-/g, '/'))
        );

        testimonials.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });

        resolve({
          active: (e.target as HTMLElement).classList[1],
          filtered: result,
        });
      });
    });
  }

  public interests(e: any) {
    return new Promise((resolve, reject) => {
      const usersFiltered = this.raw.sort(
        (a, b) => b.testimonial.interests - a.testimonial.interests
      );
      resolve({
        active: (e.target as HTMLElement).classList[1],
        filtered: usersFiltered,
      });
    });
  }
}
