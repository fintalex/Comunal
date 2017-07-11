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

            var newBill = new Bill
            {
                Comment = string.IsNullOrEmpty(bill.Comment) ? "" : bill.Comment,
                Fine = bill.Fine,
                FlatId = bill.FlatId,
                InvoiceDate = bill.InvoiceDate,
                Recalculation = bill.Recalculation,
                CounterDatas = bill.CounterDatas,
                MaintenanceDatas = bill.MaintenanceDatas
            };

            this.context.Bills.Add(newBill);
            this.context.Commit();

            return newBill;
        }

        /// <summary>
        /// Update bill
        /// </summary>
        /// <param name="bill">Bill</param>
        public void UpdateBill(Bill bill)
        {
            var currentBill = this.context.Bills.FirstOrDefault(b => b.Id == bill.Id);

            currentBill.Comment = bill.Comment;
            currentBill.Fine = bill.Fine;
            currentBill.FlatId = bill.FlatId;
            currentBill.InvoiceDate = bill.InvoiceDate;
            currentBill.Recalculation = bill.Recalculation;

            foreach (var item in bill.CounterDatas)
            {
                var countData = currentBill.CounterDatas.FirstOrDefault(cd => cd.Id == item.Id);
                if (countData != null)
                {
                    countData.Reading = item.Reading;
                    countData.ReadingDate = item.ReadingDate;
                    countData.ReadingODN = item.ReadingODN;
                }
            }

            foreach (var maintData in bill.MaintenanceDatas)
            {
                if (currentBill.MaintenanceDatas.FirstOrDefault(m => m.MaintenanceId == maintData.MaintenanceId) == null)
                {
                    currentBill.MaintenanceDatas.Add(maintData);
                }
            }

            var maintDatasIds = bill.MaintenanceDatas.Select(x => x.Id).ToList();

            currentBill.MaintenanceDatas
                .Where(m => !maintDatasIds.Contains(m.Id))
                .ToList()
                .ForEach(item => context.MaintenanceDatas.Remove(item));

            //foreach (var maint in bill.MaintenanceDatas)
            //{
            //    var maintData = currentBill.MaintenanceDatas.FirstOrDefault(cd => cd.Id == maint.Id);
            //    if (maintData != null && maintData.MaintenanceTarif.Tarif != maint.MaintenanceTarif.Tarif)
            //    {
            //        var newTarif = new MaintenanceTarif { Tarif = maint.MaintenanceTarif.Tarif };
            //        maintData.MaintenanceTarif = newTarif;
            //    }
            //}

            this.context.Commit();
        }
    }
}
