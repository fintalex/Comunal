import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
    constructor() {

    }

    getAllMonthes(bills: any[] = null): any[] {
        if (bills != null && bills.length > 0) {

        }
        return [
            { Id: 0, Name: 'Январь' },
            { Id: 1, Name: 'Февраль' },
            { Id: 2, Name: 'Март' },
            { Id: 3, Name: 'Апрель' },
            { Id: 4, Name: 'Май' },
            { Id: 5, Name: 'Июнь' },
            { Id: 6, Name: 'Июль' },
            { Id: 7, Name: 'Август' },
            { Id: 8, Name: 'Сентябрь' },
            { Id: 9, Name: 'Октябрь' },
            { Id: 10, Name: 'Ноябрь' },
            { Id: 11, Name: 'Декабрь' },
        ];
    }

    getAllYears(yearsCount: number): any[] {
        var allYears: any[] = [];
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        for (var year = currentYear - yearsCount; year <= currentYear+1; year++) {
            allYears.push(year);
        }

        return allYears;
    }

    getAllDays(month: number, year: number): any[] {
        var dayInMonth: number = new Date(year, month, 0).getDate();
        var days: any[] = [];
        for (var day = 1; day <= dayInMonth; day++) {
            days.push(day);
        }

        return days;
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
