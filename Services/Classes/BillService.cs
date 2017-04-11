using Data;
using Domain;
using System.Linq;
using Services.Interfaces;
using System;

namespace Services.Classes
{
    public class BillService : IBillService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Bill service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public BillService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Get Bill by id
        /// </summary>
        /// <param name="id">Id of bill</param>
        /// <returns>Bill</returns>
        public Bill GetById(int id)
        {
            return this.context.Bills.FirstOrDefault(b => b.Id == id);
        }

        /// <summary>
        /// Get All Bills
        /// </summary>
        /// <returns></returns>
        public IQueryable<Bill> GetBills(int flatId)
        {
            return this.context.Bills
                .Where(b => b.FlatId == flatId)
                .OrderByDescending(b => b.InvoiceDate);
        }

        /// <summary>
        /// Delete Bill by id
        /// </summary>
        /// <param name="id">Bill id</param>
        public void DeleteBill(int id)
        {
            var bill = this.context.Bills.FirstOrDefault(b => b.Id == id);
            this.context.Bills.Remove(bill);
            this.context.Commit();
        }

        /// <summary>
        /// Add bill
        /// </summary>
        /// <param name="bill">bill</param>
        public Bill AddBill(Bill bill)
        {
            //TODO: when will be current session with current chosen FLAT
            if (bill.FlatId == 0)
            {
                bill.FlatId = this.context.Flats.FirstOrDefault().Id;
            }
            this.context.Bills.Add(bill);
            this.context.Commit();

            return bill;
        }

        /// <summary>
        /// Update bill
        /// </summary>
        /// <param name="bill">Bill</param>
        public void UpdateBill(Bill bill)
        {
            var currentBill = this.context.Bills.FirstOrDefault(b => b.Id == bill.Id);
            currentBill.Comment = bill.Comment;
            currentBill.Recalculation = bill.Recalculation;
            currentBill.Fine = bill.Fine;
            currentBill.InvoiceDate = bill.InvoiceDate;

            this.context.Commit();
        }
    }
}
