import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { Toast } from '../classes';
import { fadeInAnimation, slideFromBottom, slideFadeInAnimation } from '../animations';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    animations: [
        fadeInAnimation,
        slideFromBottom,
        slideFadeInAnimation,
    ]
})
export class NotificationsComponent implements OnInit {
    toasts: Toast[] = [];

    constructor(private toastService: ToastService) { }

    ngOnInit(): void {
        this.toastService.toasts.subscribe((toasts: Toast[]) => {
            this.toasts = toasts;
        });
    }
    dismiss(toast: Toast) {
        this.toastService.dismissToast(toast);
    }
}
