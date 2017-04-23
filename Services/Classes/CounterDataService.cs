using Data;
using Domain;
using System.Linq;
using System.Data.Entity;
using Services.Interfaces;
using System.Collections.Generic;
using System;

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
		/// Get CounterDatas by BillId
		/// </summary>
		/// <param name="billId">billId</param>
		/// <returns>Counter Data</returns>
		public IQueryable<CounterData> GetCounterDatasByBill(int billId)
        {
            return this.context.CounterDatas.Where(cd => cd.BillId == billId);
        }

        /// <summary>
        /// Get CounterDatas for new Bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <returns>List of empty counter Data</returns>
		public IQueryable<CounterData> GetCounterDatasForNewBill(int flatId)
        {
            var counterDatas = new List<CounterData>();
            var counters = this.context.Counters
                .Where(c => c.FlatId == flatId)
                .ToList();

            foreach (var curCounter in counters)
            {
                var newCounterData = new CounterData() {
                    Counter = curCounter,
                    CounterTarif = curCounter.CounterTarif,
                    Reading = 0,
                    ReadingDate = DateTime.Now,
                    BillId = 0
                };
                counterDatas.Add(newCounterData);
            }

            return counterDatas.AsQueryable();
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
			this.context.CounterDatas.RemoveRange(counterDatas);
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
			currentCounterData.ReadingDate = counterData.ReadingDate;
			currentCounterData.IsFirst = counterData.IsFirst;
			currentCounterData.CounterId = counterData.CounterId;
			//currentCounterData.CounterTarifId = counterData.CounterTarifId;

			this.context.Commit();
		}
	}
}
