import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { CounterDataService } from '../../../services/counterData.service';

import { ChartService } from '../../../services/chart.service';

import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'diagram-expense',
    templateUrl: `diagram-expense.component.html`
})
export class DiagramExpenseComponent implements OnInit {
    //http://code.promactinfo.com/md2/#/dialog
    options: Object;
    dateFrom: any;
    dateTo: any;
    dataExpense: any[];
    chartTypes: any[];
    selectedChartType: number = 1;

    constructor(
        private authService: AuthService,
        private chartService: ChartService,
        private counterDataService: CounterDataService
    ) { }

    ngOnInit() {
        this.chartTypes = [
            { value: 1, name: 'Диаграмма расходов'},
            { value: 2, name: 'График расходов'}
        ];

        var curDate = new Date();

        this.dateFrom = new Date(curDate.getFullYear(), curDate.getMonth() - 3, curDate.getDate());
        this.dateTo = curDate;

        this.filterDiagram();
    }

    showDiagram(dateFilterFrom: string, dateFilterTo: string) {
        var req = {
            DateFrom: dateFilterFrom,
            DateTo: dateFilterTo,
            FlatId: this.authService.CurrentUser.Flat.Id
        };

        this.chartService.getDataForDiagramExpense(req)
            .subscribe(result => {
                this.dataExpense = result;

                var groups = _.groupBy(result, (val: any) => {
                    return val.CounterName;
                });

                var resDataForDiagram = _.map(groups, (g: any) => {
                    return {
                        name: g[0].CounterName,
                        y: this.getSumForCounterDataArray(g)
                        //g.length > 1
                        //    ? _.reduce(g, (countDataPrev: any, countDataNext: any) => {
                        //        return this.counterDataService.getSumForCounter(countDataNext, 1) + this.counterDataService.getSumForCounter(countDataPrev, 1) +
                        //            this.counterDataService.getSumForCounter(countDataNext, 2) + this.counterDataService.getSumForCounter(countDataPrev, 2);
                        //    })
                        //    : this.counterDataService.getSumForCounter(g[0], 1) + this.counterDataService.getSumForCounter(g[0], 2)
                    }
                });

                this.options = {
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
                                format: '<b>{point.name}</b>: <br/> ({point.y} руб) - {point.percentage:.1f} %',
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
                        data: resDataForDiagram
                    }]
                };
            });
    }


    filterDiagram() {
        var dateFromFilter = moment(this.dateFrom).format('YYYY/MM/DD');
        var dateToFilter = moment(this.dateTo).format('YYYY/MM/DD');

        this.showDiagram(dateFromFilter, dateToFilter);
    }

    changeChartType(e: any) {
        console.log(e);
    }

    // ===== Private methods =====
    getSumForCounterDataArray = (arrayCounterDatas: any) => {
        var sum = 0;
        _.each(arrayCounterDatas, (countDataNext: any) => {
            sum += this.counterDataService.getSumForCounter(countDataNext, 1) + this.counterDataService.getSumForCounter(countDataNext, 2);
        });
        return sum;
    }
}