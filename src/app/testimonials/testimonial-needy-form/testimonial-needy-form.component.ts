import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Apollo } from 'apollo-angular';
import { mutationUser, mutationTestimonial, queryStates, queryCities, CreateMutationResponse} from './graphql';



@Component({
  selector: 'testimonial-needy-form',
  templateUrl: './testimonial-needy-form.component.html'
})
export class TestimonialNeedyFormComponent implements OnInit {

  loading: boolean = true;

  formStep: boolean = false;
  formStepText = 'Prosseguir';

  public states: any[];
  public cities: any[];
  public stateId: string;

  constructor(private apollo: Apollo) { }
  

  formSteps() {
    this.formStep = !this.formStep;

    !this.formStep ? this.formStepText = 'Prosseguir' : this.formStepText = 'Anterior';
  }

  citiesState(event) {
    const elSelected = event.target;
    const value = elSelected.options[elSelected.selectedIndex].getAttribute('state-id');
    const stateId = value;

    this.loading = !this.loading;

    // Get "cities" from database based in "state id" when state field selected
    const getCities = (id: string) => {
      this.apollo
      .query<any>({
        query: queryCities,
        variables: {
          stateId: id,
        }
      })
      .subscribe(
        ({ data, loading }) => {
          setTimeout(() => {
            this.cities = data.cityMany;
            this.loading = loading;
          }, 2000);
        }
      );
    }

    getCities(stateId);

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

    // Start a query with all states
    // TODO maybe call this only when user click next step

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