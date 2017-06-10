import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shorterTime'})
export class ShorterTimePipe implements PipeTransform {
    transform(value: string): string {
        if (value==null) {
            return null;
        }
        if(value.length == 8)
            return value.substr(0,5);
        if(value.length == 7)
            return value.substr(0,4);
    }
}