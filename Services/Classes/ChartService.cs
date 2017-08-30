using Data;
using Domain;
using DTO;
using Services.Interfaces;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Services.Classes
{
    public class ChartService : IChartService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Chart service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public ChartService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Get date for Diagram expense
        /// </summary>
        /// <param name="inputDTO">Input Data</param>
        /// <returns>Data for diagram</returns>
        public IQueryable<DiagramExpenseDTO> GetDiagrameExpenses(InputChartDataDTO inputDTO)
        {
            var dateFrom = Convert.ToDateTime(inputDTO.DateFrom);
            var dateTo = Convert.ToDateTime(inputDTO.DateTo);

            var res = this.context.CounterDatas
                .Where(b => b.Bill.FlatId == inputDTO.FlatId && b.Bill.InvoiceDate >= dateFrom && b.Bill.InvoiceDate <= dateTo)
                .GroupBy(c => c.Counter.Name)
                .Select(d => new DiagramExpenseDTO
                {
                    name = d.Key,
                    y = d.Sum(getSum())
                });

            return res;
        }

        Func<CounterData, double> getSum()
        {
            return c => c.CounterTarif.Tarif1 * c.Reading;
            //return c => {
            //    double summ = c.CounterTarif.Tarif1 * c.Reading;

            //    //var lastReading = c.LastCounterDataId.HasValue ? c.LastCounterData.Reading : c.Counter.StartReading;

            //    //var currentPlusReading = c.Reading - lastReading;

            //    //if (currentPlusReading <= c.CounterTarif.Limit1)
            //    //{
            //    //    return currentPlusReading * c.CounterTarif.Tarif1;
            //    //}

            //    //if (currentPlusReading > c.CounterTarif.Limit1)
            //    //{
            //    //    summ += c.CounterTarif.Limit1 * c.CounterTarif.Tarif1;
            //    //}

            //    //if (c.CounterTarif.Limit2 == 0 || currentPlusReading <= c.CounterTarif.Limit2)
            //    //{
            //    //    summ += (currentPlusReading - c.CounterTarif.Limit1) * c.CounterTarif.Tarif2;
            //    //}
            //    //else
            //    //{
            //    //    summ += (c.CounterTarif.Limit2 - c.CounterTarif.Limit1) * c.CounterTarif.Tarif2;
            //    //    summ += (currentPlusReading - c.CounterTarif.Limit2) * c.CounterTarif.Tarif3;
            //    //}

            //    return summ;
            //};
        }
    }
}
