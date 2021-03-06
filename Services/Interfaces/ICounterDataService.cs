﻿using Data;
using System;
using System.Collections.Generic;
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

        /////// <summary>
        /////// Get CounterDatas by CounterId
        /////// </summary>
        /////// <param name="counterId">CounterId</param>
        /////// <returns></returns>
        ////IQueryable<CounterData> GetCounterDatas(int counterId);

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

        /// <summary>
		/// Get CounterDatas by BillId
		/// </summary>
		/// <param name="billId">billId</param>
		/// <returns>Counter Data</returns>
		IQueryable<CounterData> GetCounterDatasByBill(int billId);

        /// <summary>
        /// Get CounterDatas for new Bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <param name="dateForBill">Date for bill</param>
        /// <returns>List of empty counter Data</returns>
		IQueryable<CounterData> GetCounterDatasForNewBill(int flatId, DateTime dateForBill);

        /// <summary>
        /// Set new Tariff for Counter Data
        /// </summary>
        /// <param name="counterData"></param>
        void ChangeTarif(CounterData counterData);

        /// <summary>
		/// Get CounterDatas by Counter Id
		/// </summary>
		/// <param name="counterId">Counter Id</param>
		/// <returns>Counter Datas</returns>
		IQueryable<CounterData> GetCounterDatasByCounter(int counterId);

        /// <summary>
        /// Get CounterData Not added to bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <param name="billId">Bill id</param>
        /// <returns>List of empty Counter Data</returns>
		IQueryable<CounterData> GetCounterDatasNotAdded(int flatId, int billId);
    }
}