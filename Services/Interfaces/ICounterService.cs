using Data;
using System.Linq;

namespace Services.Interfaces
{
    public interface ICounterService
    {
        /// <summary>
        /// Get Counter by id
        /// </summary>
        /// <param name="id">Id of counter</param>
        /// <returns>Counter</returns>
        Counter GetById(int id);

        /// <summary>
        /// Get All Counters
        /// </summary>
        /// <returns></returns>
        IQueryable<Counter> GetCounters(int flatId);

        /// <summary>
        /// Delete Counter by id
        /// </summary>
        /// <param name="id">Counter id</param>
        void DeleteCounter(int id);

        /// <summary>
        /// Add counter
        /// </summary>
        /// <param name="counter">counter</param>
        Counter AddCounter(Counter counter);

        /// <summary>
        /// Update counter
        /// </summary>
        /// <param name="counter">Counter</param>
        void UpdateCounter(Counter counter);

        /// <summary>
        /// Get All Water Counters by flat
        /// </summary>
        /// <returns>Water counters</returns>
        IQueryable<Counter> GetWaterCounters(int flatId);

        ///// <summary>
        ///// Set new Tariff for Counter Data
        ///// </summary>
        ///// <param name="counter"></param>
        ///// <returns></returns>
        //Counter SetNewTariff(Counter counter);
    }
}