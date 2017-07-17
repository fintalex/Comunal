import { Component } from '@angular/core';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: `about.component.html`,
    animations: [
        trigger('myFirstAnimation', [
            state('small', style({
                transform: 'scale(1)',
            })),
            state('large', style({
                transform: 'scale(1.2)',
            })),
            transition('small <=> large', animate('300ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.5 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
            ]))),
        ]),
    ]
})
export class AboutComponent  { 
    options: Object;

    state: string = 'small';

    constructor() {
        this.options = {
            title: { text: 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129],
            }]
        };
    }

    animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
    }
}