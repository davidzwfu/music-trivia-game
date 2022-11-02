import { trigger, state, style, query, group, animate, animateChild, transition } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('.2s ease-in-out', style({ opacity: 1 })),
        ]),
    ]);

export const slideFromBottom =
    trigger('slideFromBottom', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(82vh)' }),
            animate('.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            style({ opacity: 1, transform: 'translateY(0)' }),
            animate('.3s ease-in', style({ opacity: 0, transform: 'translateY(82vh)' })),
        ]),
    ]);

export const slideFadeInAnimation =
    trigger('slideFadeIn', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(24px)' }),
            animate('.3s cubic-bezier(0.4,0.0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition('void => right', [
            style({ opacity: 0, transform: 'translateY(-24px)' }),
            animate('.3s cubic-bezier(0.4,0.0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('.3s ease-out', style({ opacity: 0 })),
        ]),
    ]);

export const playAnimation = 
    trigger('play', [
        transition(':enter', [
            style({ opacity: .9, 'stroke-dashoffset': 100.53096491487338 }),
            animate('.6s ease-in-out', style({ opacity: .9, 'stroke-dashoffset': -100.53096491487338 })),
        ]),
    ]);

export const slideInAnimation =
    trigger('routeAnimations', [
        /*transition('CalculatorPage => CheckoutPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
            }), 
        ]),
        query(':enter', [
            style({ left: '100%'})
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
            animate('1000ms ease', style({ left: '-100%'}))
            ]),
            query(':enter', [
            animate('1000ms ease', style({ left: '0%'}))
            ])
        ]),
        query(':enter', animateChild()),
        ]),*/
        transition('* => *', [
            query(':enter', [
                style({ opacity: '0' })
            ], { optional: true }),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':enter', [
                    animate('1000ms ease', style({ opacity: '1' }))
                ], { optional: true })
            ]),
            query(':enter', animateChild(), { optional: true }),
        ]),
        /*transition('CheckoutPage => CalculatorPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
            })
        ]),
        query(':enter', [
            style({ left: '-100%'})
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
            animate('800ms ease', style({ left: '100%'}))
            ]),
            query(':enter', [
            animate('800ms ease', style({ left: '0%'}))
            ])
        ]),
        query(':enter', animateChild()),
        ])*/
    ]);