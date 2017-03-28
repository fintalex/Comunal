using Data;
using Domain;
using System.Linq;
using System.Data.Entity;
using Services.Interfaces;

namespace Services.Classes
{
    public class CounterDataService : ICounterDataService
    {
        private readonly IDataContext context;

        /// <summary>
        /// CounterData service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public CounterDataService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Get CounterData by id
        /// </summary>
        /// <param name="id">Id of CounterData</param>
        /// <returns>CounterData</returns>
        public CounterData GetById(int id)
        {
            return this.context.CounterDatas.FirstOrDefault(cd => cd.Id == id);
        }

        /// <summary>
        /// Get CounterDatas by CounterId
        /// </summary>
        /// <param name="counterId">CounterId</param>
        /// <returns></returns>
        public IQueryable<CounterData> GetCounterDatas(int counterId)
        {
            return this.context.CounterDatas.Where(cd => cd.CounterId == counterId);
        }

        /// <summary>
        /// Delete CounterData by id
        /// </summary>
        /// <param name="id">CounterData id</param>
        public void DeleteCounterData(int id)
        {
            var counterData = this.context.CounterDatas.FirstOrDefault(cd => cd.Id == id);
            this.context.CounterDatas.Remove(counterData);
            this.context.Commit();
        }

        /// <summary>
        /// Delete all CounterDatas by CounterId
        /// </summary>
        /// <param name="counterId">CounterId</param>
        public void DeleteAllCounterDatas(int counterId)
        {
            var counterDatas = this.context.CounterDatas.Where(cd => cd.CounterId == counterId);

            foreach (var cd in counterDatas)
                this.context.CounterDatas.Remove(cd);

            this.context.Commit();
        }

        /// <summary>
        /// Add CounterData
        /// </summary>
        /// <param name="counterData">CounterData for creating</param>
        public CounterData AddCounterData(CounterData counterData)
        {
            return this.context.CounterDatas.Add(counterData);
        }

        /// <summary>
        /// Update CounterData
        /// </summary>
        /// <param name="counterData">CounterData</param>
        public void UpdateCounterData(CounterData counterData)
        {
            var currentCounterData = this.context.CounterDatas.FirstOrDefault(cd => cd.Id == counterData.Id);
            currentCounterData.Reading = counterData.Reading;
            currentCounterData.ReadingODN = counterData.ReadingODN;
            currentCounterData.CreatedDate = counterData.CreatedDate;
            currentCounterData.IsFirst = counterData.IsFirst;
            currentCounterData.CounterId = counterData.CounterId;
            currentCounterData.CounterTarifId = counterData.CounterTarifId;

            this.context.Commit();
        }
    }
}
