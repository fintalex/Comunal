import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "dateru"
})

export class DateRu implements PipeTransform {
    transform(value: string, args: string[]): any {

        if (!value) return value;

        var curDate = new Date(value);

        var options = {
            // era: 'long',  ===== от Рождества Христова
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            //weekday: 'long',
            //timezone: 'UTC',
            //hour: 'numeric',
            //minute: 'numeric',
            //second: 'numeric'
        };


        // toLocaleString - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

        return curDate.toLocaleString("ru", options);
    }
}