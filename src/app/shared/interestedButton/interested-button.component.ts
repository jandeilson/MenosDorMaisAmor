import { Component, Input } from '@angular/core';
import { InterestsGQL } from '../../graphql/interests';
import { Router } from '@angular/router';

@Component({
    selector: 'interested-button',
    template: `
    <button class="btn btn-default style1" (click)="upInterest()">{{title}}</button>
    `,
})

export class InterestedButtonComponent {
    @Input() testimonialId: number;
    @Input() title: string;
    @Input() count: number;

    constructor(private interestsGQL: InterestsGQL, private router: Router) {}

    upInterest() {
        this.count = this.count + 1;

        this.interestsGQL
            .mutate({
                testimonialId: this.testimonialId,
                count: this.count
            })
            .subscribe();

        this.router.navigate(['/testimonial', this.testimonialId])
    }

}