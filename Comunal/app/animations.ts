import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Example - https://www.youtube.com/watch?v=h-bUT5BMQrI&t=898s
export const slideDownAnimation: AnimationEntryMetadata =
    trigger('routeAnimation', [
        state('*',
            style({
                opacity: 1,
                transform: 'translateX(0)'
            })
        ),
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translateX(-100%)'
            }),
            animate('0.2s ease-in')
        ]),
        transition(':leave', [
            animate('0.5s ease-out', style({
                opacity: 0,
                transform: 'translateY(100%)'
            }))
        ])    
    ]);