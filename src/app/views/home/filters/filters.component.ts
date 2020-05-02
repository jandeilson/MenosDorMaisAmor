import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { queryStates } from '../../../graphql/home'

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {

  public loading: boolean = true;
  public states: any[];

 
  constructor(private apollo: Apollo) {}
  
  getStates() {
    this.apollo
    .query<any>({
      query: queryStates
    })
    .subscribe(
      ({ data, loading }) => {
        this.states = data.stateMany;
        this.loading = loading;
      }
    );
  }


}
