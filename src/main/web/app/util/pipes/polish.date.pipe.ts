import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'polishDate'})
export class PolishDatePipe implements PipeTransform {
    transform(value: string): string {
        if (value==null) {
            return null;
        }
        return value.replace('Jan','Sty')
            .replace('Feb','Lut')
            .replace('Mar','Mar')
            .replace('Apr','Kwi')
            .replace('May','Maj')
            .replace('Jun','Cze')
            .replace('Jul','Lip')
            .replace('Aug','Sie')
            .replace('Sep','Wrz')
            .replace('Oct','Paź')
            .replace('Nov','Lis')
            .replace('Dec','Gru');
        
    }
}