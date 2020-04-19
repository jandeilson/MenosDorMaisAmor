import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Apollo } from 'apollo-angular';
import { mutationUser, mutationTestimonial, queryStates, queryCities, CreateMutationResponse} from './graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrazilianStatesGQL, States } from '../../graphql/states'
import { BrazilianCitiesGQL, Cities } from '../../graphql/cities'

@Component({
  selector: 'testimonial-needy-form',
  templateUrl: './testimonial-needy-form.component.html'
})
export class TestimonialNeedyFormComponent implements OnInit {

  loading: boolean = false;
  formStep: boolean = false;
  formStepText = 'Prosseguir ⮞';
  states: Observable<States[]>;
  cities: Cities[];
  stateId: string;

  constructor(private apollo: Apollo, private brazilianStates: BrazilianStatesGQL, private brazilianCitiesGQL: BrazilianCitiesGQL) { }
  

  formSteps() {
    this.formStep = !this.formStep;
    !this.formStep ? this.formStepText = 'Prosseguir ⮞' : this.formStepText = '⮜ Anterior';

    this.states = this.brazilianStates.watch()
    .valueChanges
    .pipe(map((result) => result.data && result.data.stateMany));
  }

  citiesState(event: any) {
    this.loading = !this.loading;
    const elSelected = event.target;
    const value = elSelected.options[elSelected.selectedIndex].getAttribute('state-id');
    const stateId = value;

    // Get cities our database
    this.brazilianCitiesGQL.watch({
      stateId: stateId,
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.cities = data.cityMany;
    });
  }

  // Form groups
  form = new FormGroup({
    testimonial: new FormGroup({
      textTestimonial: new FormControl('', Validators.required),
      mediaPhotos: new FormArray([]),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    }),
    user: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', Validators.required),
    }),
  })

  get fieldValidation() {
    return {
      // Testimonial group
      testimonial: this.form.get('testimonial.textTestimonial'),
      state: this.form.get('testimonial.state'),
      city: this.form.get('testimonial.city'),
      
      // User Group
      firstName: this.form.get('user.firstName'),
      lastName: this.form.get('user.lastName'),
      email: this.form.get('user.email'),
      phone: this.form.get('user.phone')
    }
  }

  get addMediaPhotos(): FormArray {
    return this.form.get('testimonial.mediaPhotos') as FormArray;
  };

  detectFiles(event: any) {
    let files = event.target.files;
    if (files) {
        for (let file of files) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                this.addMediaPhotos.push(new FormControl({
                  fileName: file.name,
                  //url: e.target.result
              }));
            }
            reader.readAsDataURL(file);
        }
    }
  }

  // actions input submit 
  submit(f) {

    // TODO otimize all mutations on this function
    const formValue = f.form.value;
    
    this.apollo
    .mutate<CreateMutationResponse>({
      mutation: mutationUser,
      variables: {
        firstName: formValue.user.firstName,
        lastName: formValue.user.lastName,
        email: formValue.user.email,
        phone: formValue.user.phone
      }
    }).subscribe((response) => {
      const userId = response.data;
      this.loading = response.data.loading;
      callMutationTestimonial(userId);
    }, (error) => {
      console.error(error);
    });

    // After submit "user mutation" and get "user id" call "testimonial mutation"
    const callMutationTestimonial = (userId: any) => {

      this.apollo
      .mutate<CreateMutationResponse>({
        mutation: mutationTestimonial,
        variables: {
          user: userId.userCreateOne.record._id,
          text: formValue.testimonial.textTestimonial,
          state: formValue.testimonial.state,
          city: formValue.testimonial.city,
          mediaPhotos: formValue.testimonial.mediaPhotos
        }
      }).subscribe((response) => {
        this.loading = response.data.loading;
      }, (error) => {
        console.error(error);
      });
      
    }
  }

  ngOnInit(): void {
    
  }

}