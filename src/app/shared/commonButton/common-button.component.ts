import { Component, Input } from '@angular/core';

@Component({
    selector: 'common-button',
    template: `
    <button class="btn btn-default">{{ title }}</button>
    `,
})

export class CommonButtonComponent {
    @Input() testimonialId: number;
    @Input() title: string;

    constructor() { }
}