import { Component } from '@angular/core';

import { trigger, state, style, transition, animate, keyframes, query } from '@angular/animations';

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

        trigger('itemAnim', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate(350)
            ]),
            transition(':leave', [
                animate('0.2s ease', style({
                    transform: 'translate(150px, 25px)'
                })),
                animate('0.5s 0.2s ease', style({
                    opacity: 0
                }))
            ])
        ]),

        trigger('queryAnimation', [
            transition('* => goAnimate', [
                // hide the inner elements
                query('h1', style({ opacity: 0 })),
                query('.content', style({ opacity: 0 })),

                // animate the inner elements in, one by one
                query('h1', animate(1000, style({ opacity: 1 }))),
                query('.content', animate(1000, style({ opacity: 1 }))),
            ])
        ])
    ]
})
export class AboutComponent  { 
    options: Object;

    state: string = 'small';

    exp = '';
    constructor() {
        this.options = {
            title: { text: 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129],
            }]
        };
    }

    

    goAnimate() {
        this.exp = (this.exp === 'goAnimate' ? '' : 'goAnimate');
    }

    animateMe() {
        this.state = (this.state === 'small' ? 'large' : 'small');
    }
}