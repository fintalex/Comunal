using Data;
using Domain;
using DTO;
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
		/// Get CounterDatas by BillId
		/// </summary>
		/// <param name="billId">billId</param>
		/// <returns>Counter Data</returns>
		public IQueryable<CounterData> GetCounterDatasByBill(int billId)
        {
            return this.context.CounterDatas.Where(cd => cd.BillId == billId);
        }

        /// <summary>
		/// Get CounterDatas by Counter Id
		/// </summary>
		/// <param name="counterId">Counter Id</param>
		/// <returns>Counter Datas</returns>
		public IQueryable<CounterData> GetCounterDatasByCounter(int counterId)
        {
            return this.context.CounterDatas
                .Where(cd => cd.CounterId == counterId)
                .OrderByDescending(c => c.Bill.InvoiceDate);
        }

        /// <summary>
        /// Get CounterDatas for new Bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <param name="dateForBill">Date for bill</param>
        /// <returns>List of empty counter Data</returns>
		public IQueryable<CounterData> GetCounterDatasForNewBill(int flatId, DateTime dateForBill)
        {
            var counterDatas = new List<CounterData>();
            var counters = this.context.Counters
                .Where(c => c.FlatId == flatId)
                .ToList();

            //var lastBill = this.context.Bills.Where(b => b.InvoiceDate < dateForBill).OrderByDescending(d => d.InvoiceDate).FirstOrDefault();

            foreach (var curCounter in counters)
            {
                ///var lastCounterData = curCounter.CounterDatas.OrderByDescending(cd => cd.Id).FirstOrDefault();
                var lastCounterData = curCounter.CounterDatas
                    .Where(b => b.Bill.InvoiceDate < dateForBill)
                    .OrderByDescending(cd => cd.Bill.InvoiceDate)
                    .FirstOrDefault();

                var newCounterData = new CounterData() {
                    Counter = curCounter,
                    CounterTarif = curCounter.CounterTarif,
                    Reading = lastCounterData == null ? curCounter.StartReading : lastCounterData.Reading,
                    ReadingDate = DateTime.Now,
                    LastReadingDate = lastCounterData == null ? (DateTime?)null : lastCounterData.ReadingDate,
                    LastCounterDataId = lastCounterData == null ? (int?)null : lastCounterData.Id,
                    LastCounterData = lastCounterData,
                    IsFirst = lastCounterData == null ? true : false,
                    BillId = 0
                };

                counterDatas.Add(newCounterData);
            }

            return counterDatas.AsQueryable();
        }

        /// <summary>
        /// Get CounterData Not added to bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <param name="billId">Bill id</param>
        /// <returns>List of empty Counter Data</returns>
		public IQueryable<CounterData> GetCounterDatasNotAdded(int flatId, int billId)
        {
            var counterDatas = new List<CounterData>();
            var counters = this.context.Counters
                .Where(c => c.FlatId == flatId)
                .ToList();

            var currentBill = this.context.Bills.FirstOrDefault(b => b.Id == billId);

            var countDataInBill = this.context.CounterDatas.Where(cd => cd.BillId == billId).Select(m => m.CounterId).ToList();

            foreach (var curCounter in counters.Where(m => !countDataInBill.Contains(m.Id)))
            {
                var lastCounterData = this.context.CounterDatas
                    .Where(c => c.CounterId == curCounter.Id && c.Bill.InvoiceDate < currentBill.InvoiceDate)
                    .OrderByDescending(c => c.Bill.InvoiceDate).FirstOrDefault();

                var newCounterData = new CounterData()
                {
                    Counter = curCounter,
                    CounterTarif = curCounter.CounterTarif,
                    BillId = billId,
                    LastCounterData = lastCounterData,
                    LastCounterDataId = lastCounterData == null ? (int?)null : lastCounterData.Id,
                    LastReadingDate = lastCounterData == null ? (DateTime?)null : lastCounterData.ReadingDate,
                    Reading = lastCounterData == null ? curCounter.StartReading : lastCounterData.Reading,
                    ReadingDate = DateTime.Now,
                    IsFirst = lastCounterData == null ? true : false
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

        /// <summary>
        /// Set new Tariff for Counter Data
        /// </summary>
        /// <param name="counterData"></param>
        public void ChangeTarif (CounterData counterData)
        {
            var curCounterData = this.context.CounterDatas.FirstOrDefault(c => c.Id == counterData.Id);

            if(curCounterData != null)
            {
                var newTariff = new CounterTarif()
                {
                    Limit1 = counterData.CounterTarif.Limit1,
                    Limit2 = counterData.CounterTarif.Limit2,
                    Tarif1 = counterData.CounterTarif.Tarif1,
                    Tarif2 = counterData.CounterTarif.Tarif2,
                    Tarif3 = counterData.CounterTarif.Tarif3,
                    TarifCount = counterData.CounterTarif.TarifCount
                };

                this.context.CounterTarifs.Add(newTariff);

                curCounterData.CounterTarif = newTariff;

                this.context.Commit();
            }
        }
    }
}
