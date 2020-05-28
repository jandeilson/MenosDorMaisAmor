import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BrazilianStatesGQL, States } from "../../../graphql/states";
import { BrazilianCitiesGQL, Cities } from "../../../graphql/cities";
import { TestimonialGQL } from "src/app/graphql/testimonial-form";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserGQLMutation } from "../../../graphql/users";

@Component({
  selector: "testimonial-form",
  templateUrl: "./testimonial-form.component.html",
})
export class TestimonialFormComponent {
  loading: boolean = false;
  formStep: boolean = false;
  formStepText: string = "Prosseguir";
  states: Observable<States[]>;
  cities: Cities[];
  stateId: string;
  filesToUpload: Array<File> = [];
  fileUploadProgress: number = 0;
  phoneMask: number;

  constructor(
    private testimonialGQL: TestimonialGQL,
    private UserGQLMutation: UserGQLMutation,
    private brazilianStates: BrazilianStatesGQL,
    private brazilianCitiesGQL: BrazilianCitiesGQL,
    private http: HttpClient,
    private router: Router
  ) {}

  formSteps() {
    window.scroll(0, 0);
    this.formStep = !this.formStep;
    !this.formStep
      ? (this.formStepText = "Prosseguir")
      : (this.formStepText = "Anterior");

    this.states = this.brazilianStates
      .watch()
      .valueChanges.pipe(map((result) => result.data && result.data.stateMany));
  }

  setThresholds(phone: number) {
    this.phoneMask = phone;
  }

  citiesState(event: any) {
    this.loading = !this.loading;
    const elSelected = event.target;
    const value = elSelected.options[elSelected.selectedIndex].getAttribute(
      "state-id"
    );
    const stateId = value;

    this.brazilianCitiesGQL
      .watch({
        stateId: stateId,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.cities = data.cityMany;
      });
  }

  // Form groups
  form = new FormGroup({
    testimonial: new FormGroup({
      textTestimonial: new FormControl("", Validators.required),
      mediaPhotos: new FormArray([]),
      state: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      category: new FormControl("love", Validators.required),
      help: new FormControl("", Validators.required),
    }),
    user: new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", Validators.required),
    }),
  });

  get fieldValidation() {
    return {
      // Testimonial group
      testimonial: this.form.get("testimonial.textTestimonial"),
      state: this.form.get("testimonial.state"),
      city: this.form.get("testimonial.city"),
      category: this.form.get("testimonial.category"),
      help: this.form.get("testimonial.help"),

      // User Group
      firstName: this.form.get("user.firstName"),
      lastName: this.form.get("user.lastName"),
      email: this.form.get("user.email"),
      phone: this.form.get("user.phone"),
    };
  }

  get addMediaPhotos(): FormArray {
    return this.form.get("testimonial.mediaPhotos") as FormArray;
  }

  uploadFiles(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
    const files: Array<File> = this.filesToUpload;

    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.addMediaPhotos.push(
            new FormControl({
              fileName: file.name,
              //url: e.target.result
            })
          );
        };
        reader.readAsDataURL(file);
      }
    }

    const formData: any = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]["name"]);
    }

    //TODO: ENV Api URL
    this.http
      .post("http://localhost:3000/upload", formData, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((events: any) => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(
            (events.loaded / events.total) * 100
          );
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = 100;
        }
      });
  }

  submit(f: any) {
    const formTestimonial = f.form.value.testimonial;
    const formUser = f.form.value.user;

    this.UserGQLMutation.mutate({
      firstName: formUser.firstName,
      lastName: formUser.lastName,
      email: formUser.email,
      phone: formUser.phone,
    }).subscribe((response) => {
      callMutationTestimonial(response.data);
    });

    const callMutationTestimonial = (userId: any) => {
      this.testimonialGQL
        .mutate({
          user: userId.userCreateOne.record._id,
          text: formTestimonial.textTestimonial,
          state: formTestimonial.state,
          city: formTestimonial.city,
          mediaPhotos: formTestimonial.mediaPhotos,
          category: formTestimonial.category,
          help: formTestimonial.help,
        })
        .subscribe(() => {
          this.router.navigate(["/testimonial/thanks"]);
        });
    };
  }
}
