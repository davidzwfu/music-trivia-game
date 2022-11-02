import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from './classes';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts_: Toast[] = [];
    private observableToasts = new BehaviorSubject<Toast[]>(this.toasts_);
    toasts = this.observableToasts.asObservable();

    // private toasts_ = new BehaviorSubject([]);
    // toasts = this.toasts_.asObservable();

    constructor() { }

    getToasts() {
        return this.observableToasts.asObservable();
    }

    addToast(toast: Toast) {
        this.toasts_.push(toast);
        this.observableToasts.next(this.toasts_);
        setTimeout(() => {
            this.dismissToast(toast);
        }, 5000);
    }

    dismissToast(toast: Toast) {
        var index = this.toasts_.indexOf(toast);
        if (index > -1) {
            this.toasts_.splice(index, 1);
            this.observableToasts.next(this.toasts_);
        }
    }
}
