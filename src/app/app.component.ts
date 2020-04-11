import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = '- Dor + Amor';

  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }

}
