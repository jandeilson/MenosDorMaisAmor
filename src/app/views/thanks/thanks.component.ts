import { Component } from "@angular/core";

@Component({
  selector: "thanks",
  template: `
    <article class="text-center">
      <h4><strong>Obrigado!</strong></h4>
      <p>Ficamos muito felizes em receber a sua contribuição.</p>
      <p></p>
    </article>
  `,
})
export class ThanksComponent {
  constructor() {}
}
