import { trigger, state, style, transition, animate, keyframes, query, stagger, } from '@angular/animations';

export const stagerItem = trigger('staggerItem', [
    transition('* => *', [
        query('.clickable-row:enter', style({ opacity: 0 }), { optional: true }),

        query('.clickable-row:enter', stagger('100ms', [
            animate('300ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(-75px)', offset: 0 }),
                style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
            ]))
        ]), { optional: true }),

        query(':leave', stagger('100ms', [
            animate('400ms ease-in', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                style({ opacity: 0, transform: 'translateX(-75px)', offset: 1 }),
            ]))
        ]), { optional: true }),
    ])
]);

export const staggerTopExpandBottom = trigger('staggerTopExpandBottom', [
    transition('* => *', [
        query('.list-group-item:enter', style({ opacity: 0 }), { optional: true }),

        query('.list-group-item:enter', stagger('100ms', [
            animate('200ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateY(-47px)', offset: 0 }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
            ]))
        ]), { optional: true })
    ])
]);

export const staggerRightToLeft = trigger('staggerRightToLeft', [
    transition('* => *', [
        query('tr:enter', style({ opacity: 0 }), { optional: true }),

        query('tr:enter', stagger('100ms', [
            animate('200ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(50px)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
            ]))
        ]), { optional: true })
    ])
])

export const staggerLeftToRight = trigger('staggerLeftToRight', [
    transition('* => *', [
        query('tr:enter', style({ opacity: 0 }), { optional: true }),

        query('tr:enter', stagger('100ms', [
            animate('200ms ease-in', keyframes([
                style({ opacity: 0, transform: 'translateX(-50px)', offset: 0 }),
                style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
            ]))
        ]), { optional: true }),

        query(':leave', stagger('100ms', [
            animate('200ms ease-in', keyframes([
                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                style({ opacity: 0, transform: 'translateX(-75px)', offset: 1 }),
            ]))
        ]), { optional: true }),
    ])
])