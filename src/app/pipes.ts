import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe implements PipeTransform {
    transform(val: string): string {
        if (val && val.length >= 10)
            return '(' + val.slice(0, 3) + ') ' + val.slice(3, 6) + '-' + val.slice(6);
        else
            return val;
    }
}