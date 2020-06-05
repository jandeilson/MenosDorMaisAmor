import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.css'],
})
export class HowItWorksComponent implements OnInit {
  constructor() {}

  @Output() lifecycle = new EventEmitter();

  count = 0;
  imgLoad = true;

  imgOnLoad() {
    this.imgLoad = false;
  }

  step(progress: any) {
    this.imgLoad = !this.imgLoad;

    const size = 20;

    this.count += size;

    if (this.count >= size) {
      let width = this.count;

      // progress.style.width = size + '%';

      if (width === 100) {
        // this.count = 0;
        localStorage.setItem('start', 'off');
        this.lifecycle.emit();
      } else if (width <= 100) {
        width += size;
        progress.style.width = width + '%';
      }
    }
  }

  ngOnInit(): void {}
}
