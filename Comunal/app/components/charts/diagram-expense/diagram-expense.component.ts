import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'diagram-expense',
    templateUrl: `diagram-expense.component.html`
})
export class DiagramExpenseComponent implements OnInit  {

    options: Object;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.options = {
            //title: { text: 'simple chart' },
            //series: [{
            //    data: [29.9, 71.5, 106.4, 129],
            //}]
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: '1 июня - 31 августа'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: ({point.y}руб) - {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Горячая вода',
                    y: 56.33
                }, {
                    name: 'Холодная вода',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Электричество',
                    y: 10.38
                }, {
                    name: 'Газ',
                    y: 4.77
                }, {
                    name: 'Моторесурс',
                    y: 0.91
                }]
            }]
        };
    }
}