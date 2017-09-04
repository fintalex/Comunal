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
    selectedChartType: string = 'pie';

    constructor(
        private authService: AuthService,
        private chartService: ChartService,
        private counterDataService: CounterDataService
    ) { }

    ngOnInit() {
        this.chartTypes = [
            { value: 'pie', name: 'Диаграмма расходов'},
            { value: 'line', name: 'График расходов'}
        ];

        var curDate = new Date();

        this.dateFrom = new Date(curDate.getFullYear(), curDate.getMonth() - 3, curDate.getDate());
        this.dateTo = curDate;

        this.filterDiagram();
    }

    updateChart() {

        var dateFromFilter = moment(this.dateFrom).format('YYYY/MM/DD');
        var dateToFilter = moment(this.dateTo).format('YYYY/MM/DD');

        var req = {
            DateFrom: dateFromFilter,
            DateTo: dateToFilter,
            FlatId: this.authService.CurrentUser.Flat.Id
        };

        this.chartService.getDataForDiagramExpense(req)
            .subscribe(result => {
                this.dataExpense = result;

                var groups = _.groupBy(result, (val: any) => {
                    return val.CounterName;
                });

                var seriesForChart = null;

                if (this.selectedChartType == 'pie') {
                    var resDataForDiagram = _.map(groups, (g: any) => {
                        return {
                            name: g[0].CounterName,
                            y: this.getSumForCounterDataArray(g)
                        }
                    });
                    seriesForChart = [{
                        colorByPoint: true,
                        data: resDataForDiagram
                    }]
                        
                } else if (this.selectedChartType == 'line') {
                    var resDataForChart = _.map(groups, (g: any) => {
                        return {
                            name: g[0].CounterName,
                            data: this.getArrayOfCounterDataSum(g)
                        }
                    });
                    seriesForChart = resDataForChart;
                }

                this.options = {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: this.selectedChartType,
                        width: 900,
                        height: 600
                    },
                    title: {
                        text: 'Здесь может быть Title'
                    },
                    subtitle: {
                        text: 'А здесь может быть сабтайтл'
                    },
                    tooltip: {
                        pointFormat: this.selectedChartType == 'pie' ? '{point.y} руб: <b>{point.percentage:.1f}%</b>' : '{series.name}: {point.y} руб'
                    },
                    yAxis: {
                        title: {
                            text: 'Сумма по счетчикам'
                        }
                    },
                    xAxis: {
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    plotOptions: {
                        series: {
                            //pointStart: 2010
                        },
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
                    series: seriesForChart
                };
            });
    }


    filterDiagram() {
        this.updateChart();
    }

    changeChartType(e: any) {
        this.updateChart();
    }

    // ===== Private methods =====
    getSumForCounterDataArray = (arrayCounterDatas: any) => {
        var sum = 0;
        _.each(arrayCounterDatas, (countDataNext: any) => {
            sum += this.counterDataService.getSumForCounter(countDataNext, 1) + this.counterDataService.getSumForCounter(countDataNext, 2);
        });
        return sum;
    }

    getArrayOfCounterDataSum = (arrayCounterData: any) => {
        var arrayOfSum = _.map(arrayCounterData, (countData: any) => {
            return this.counterDataService.getSumForCounter(countData, 1) + this.counterDataService.getSumForCounter(countData, 2);
        });
        return arrayOfSum;
    }
}