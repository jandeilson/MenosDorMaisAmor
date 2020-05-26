import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(){}

  title = '- Dor + Amor';
  start: boolean = true;

  onActivate() {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
  }
  
  ngOnInit(): void {
    const getStart = localStorage.getItem('start');
    
    if (getStart === undefined || getStart === null || getStart.length === 0)
    localStorage.setItem('start', 'on')
    else
    getStart !== 'on' ? this.start = false : this.start = true;
  }
}
