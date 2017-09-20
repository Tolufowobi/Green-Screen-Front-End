import {trigger, state, animate,transition, style, keyframes, query} from '@angular/animations';

export const fadeInAnimation =

trigger('fadeInAnimation', [
    transition('void => *', [
        style({opacity: 0}),
        animate('250ms 250ms ease-in', keyframes([
        style({opacity: 0, transform: 'scale(0)', offset: 0}),
        style({opacity: 0.5, transform: 'scale(0.5)', offset:0.3}),
        style({opacity: 1, transform: 'scale(1)', offset: 1})
        ]))
    ]),
    transition('* => void', [
        style({opacity: 1}),
        animate('250ms ease-in', keyframes([
        style({opacity: 0.4, transform: 'scale(1)', offset: 0}),
        style({opacity: 0.2, transform: 'scale(0.5)', offset: 0.3}),
        style({opacity: 0, transform: 'scale(0)', offset: 1})
        ]))     
    ])
]);

export const fadeIn3D =
    trigger('fadeIn3D', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
    ])
]);
