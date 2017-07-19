using Data;
using Domain;
using System.Linq;
using Services.Interfaces;

namespace Services.Classes
{
    public class CounterService : ICounterService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Counter service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public CounterService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Get Counter by id
        /// </summary>
        /// <param name="id">Id of counter</param>
        /// <returns>Counter</returns>
        public Counter GetById(int id)
        {
            return this.context.Counters.FirstOrDefault(f => f.Id == id);
        }

        /// <summary>
        /// Get All Counters
        /// </summary>
        /// <returns>Counters</returns>
        public IQueryable<Counter> GetCounters(int flatId)
        {
            return this.context.Counters
                .Where(c => c.FlatId == flatId)
                .OrderBy(c => c.SortOrder)
                .ThenBy(c => c.Name);
        }

        /// <summary>
        /// Get All Water Counters by flat
        /// </summary>
        /// <returns>Water counters</returns>
        public IQueryable<Counter> GetWaterCounters(int flatId)
        {
            return this.context.Counters
                .Where(c => c.FlatId == flatId
                    && (c.CounterTypeId == (int)CounterTypes.ColdWater || c.CounterTypeId == (int)CounterTypes.HotWater))
                .OrderBy(c => c.SortOrder)
                .ThenBy(c => c.Name);
        }

        /// <summary>
        /// Delete Counter by id
        /// </summary>
        /// <param name="id">Counter id</param>
        public void DeleteCounter(int id)
        {
            var counter = this.context.Counters.FirstOrDefault(x => x.Id == id);
            this.context.Counters.Remove(counter);
            this.context.Commit();
        }

        /// <summary>
        /// Add counter
        /// </summary>
        /// <param name="counter">counter</param>
        public Counter AddCounter(Counter counter)
        {
            //TODO: when will be current session with current chosen FLAT
            if (counter.FlatId == 0)
            {
                counter.FlatId = this.context.Flats.FirstOrDefault().Id;
            }
            this.context.Counters.Add(counter);
            this.context.Commit();

            counter.CounterType = this.context.CounterTypes.FirstOrDefault(ct => ct.Id == counter.CounterTypeId);

            return counter;
        }

        /// <summary>
        /// Update counter
        /// </summary>
        /// <param name="counter">Counter</param>
        public void UpdateCounter(Counter counter)
        {
            var currentCounter = this.context.Counters.FirstOrDefault(f => f.Id == counter.Id);
            currentCounter.Name = counter.Name;
            currentCounter.StartReading = counter.StartReading;
            currentCounter.EnableODN = counter.EnableODN;
            currentCounter.SortOrder = counter.SortOrder;
            currentCounter.UnitConvertCoefficient = counter.UnitConvertCoefficient;

            if (!currentCounter.CounterTarifId.HasValue
                || currentCounter.CounterTarif.TarifCount != counter.CounterTarif.TarifCount
                || currentCounter.CounterTarif.Tarif1 != counter.CounterTarif.Tarif1
                || currentCounter.CounterTarif.Limit1 != counter.CounterTarif.Limit1
                || currentCounter.CounterTarif.Tarif2 != counter.CounterTarif.Tarif2
                || currentCounter.CounterTarif.Limit2 != counter.CounterTarif.Limit2
                || currentCounter.CounterTarif.Tarif3 != counter.CounterTarif.Tarif3)
            {
                currentCounter.CounterTarif = counter.CounterTarif;
            }

            this.context.Commit();
        }

        ///// <summary>
        ///// Set new Tariff for Counter Data
        ///// </summary>
        ///// <param name="counter"></param>
        ///// <returns></returns>
        //public Counter SetNewTariff(Counter counter)
        //{
        //    var newTariff = new CounterTarif()
        //    {
        //        Limit1 = counter.CounterTarif.Limit1,
        //        Limit2 = counter.CounterTarif.Limit2,
        //        Tarif1 = counter.CounterTarif.Tarif1,
        //        Tarif2 = counter.CounterTarif.Tarif2,
        //        Tarif3 = counter.CounterTarif.Tarif3,
        //        TarifCount = counter.CounterTarif.TarifCount
        //    };

        //    return counter;
        //}
    }
}
