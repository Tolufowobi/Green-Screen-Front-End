import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

export const staggerAnimation =

trigger('staggerAnimation', [
    // page entrance transition
    transition('*=>*', [  
        query(':enter', style({opacity:0}), {optional:true}),
        query(':enter', stagger('300ms', [
            animate('1s ease-in', keyframes([
                style({opacity:0, transform: 'translateX(-75px)', offset:0}),
                style({opacity:.5, transform: 'translateX(35px)', offset:0.3}),
                style({opacity:1, transform: 'translateX(0px)', offset:1}),
            ]))
        ]), {optional: true}),
        query(':leave', style({opacity: 0}), {optional: true})
    ]),
]);