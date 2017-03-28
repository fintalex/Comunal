using Data;
using System.Linq;

namespace Services.Interfaces
{
    public interface ICounterDataService
    {
        /// <summary>
        /// Get CounterData by id
        /// </summary>
        /// <param name="id">Id of CounterData</param>
        /// <returns>CounterData</returns>
        CounterData GetById(int id);

        /// <summary>
        /// Get CounterDatas by CounterId
        /// </summary>
        /// <param name="counterId">CounterId</param>
        /// <returns></returns>
        IQueryable<CounterData> GetCounterDatas(int counterId);

        /// <summary>
        /// Delete CounterData by id
        /// </summary>
        /// <param name="id">CounterData id</param>
        void DeleteCounterData(int id);

        /// <summary>
        /// Delete all CounterDatas by CounterId
        /// </summary>
        /// <param name="counterId">CounterId</param>
        void DeleteAllCounterDatas(int counterId);

        /// <summary>
        /// Add CounterData
        /// </summary>
        /// <param name="counterData">CounterData for creating</param>
        CounterData AddCounterData(CounterData counterData);

        /// <summary>
        /// Update CounterData
        /// </summary>
        /// <param name="counterData">CounterData</param>
        void UpdateCounterData(CounterData counterData);
    }
}