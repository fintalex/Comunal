import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

import { ChartService } from '../../../services/chart.service';


@Component({
    moduleId: module.id,
    selector: 'diagram-expense',
    templateUrl: `diagram-expense.component.html`
})
export class DiagramExpenseComponent implements OnInit  {

    options: Object;

    dataExpense: any[];

    constructor(
        private authService: AuthService,
        private chartService: ChartService
    ) {}

    ngOnInit() {
        var req = {
            DateFrom: "2017/01/01",
            DateTo: "2017/08/01",
            FlatId: this.authService.CurrentUser.Flat.Id
        };

        this.chartService.getDataForDiagramExpense(req)
            .subscribe(result => {
                this.dataExpense = result;

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
                        data: this.dataExpense
                    }]
                };
            });

        
    }
}