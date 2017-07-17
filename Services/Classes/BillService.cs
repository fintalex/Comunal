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

            foreach (var countData in newBill.CounterDatas)
            {
                var nextCounterData = this.context.CounterDatas
                    .Where(c => c.CounterId == countData.CounterId && c.Bill.InvoiceDate > countData.Bill.InvoiceDate)
                    .OrderBy(c => c.Bill.InvoiceDate).FirstOrDefault();

                if (nextCounterData != null)
                {
                    nextCounterData.LastCounterDataId = countData.Id;
                }

                this.context.Commit();
            }

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

            //UPDATE or ADD each CounterData from Client side
            foreach (var curCounter in bill.CounterDatas)
            {
                if (curCounter.Id == 0)
                {
                    currentBill.CounterDatas.Add(curCounter);

                    // NEED to find CounterDatas with the Same LastCounterData and change it to our NEW LAST CounterData
                    var nextCounterData = this.context.CounterDatas
                        .Where(c => c.CounterId == curCounter.CounterId && c.Bill.InvoiceDate > currentBill.InvoiceDate)
                        .OrderBy(c => c.Bill.InvoiceDate).FirstOrDefault();

                    if(nextCounterData != null)
                    {
                        nextCounterData.LastCounterData = curCounter;
                    }
                }
                else
                {
                    var countData = currentBill.CounterDatas.FirstOrDefault(cd => cd.Id == curCounter.Id);
                    if (countData != null)
                    {
                        countData.Reading = curCounter.Reading;
                        countData.ReadingDate = curCounter.ReadingDate;
                        countData.ReadingODN = curCounter.ReadingODN;
                    }
                }
            }

            //ADD each CounterData from Client side
            foreach (var maintData in bill.MaintenanceDatas)
            {
                if (currentBill.MaintenanceDatas.FirstOrDefault(m => m.MaintenanceId == maintData.MaintenanceId) == null)
                {
                    currentBill.MaintenanceDatas.Add(maintData);
                }
            }

            // REMOVE all deleted MaintenanceDatas from Bill
            var maintDatasIds = bill.MaintenanceDatas.Select(x => x.Id).ToList();

            currentBill.MaintenanceDatas
                .Where(m => !maintDatasIds.Contains(m.Id))
                .ToList()
                .ForEach(curMD => this.context.MaintenanceDatas.Remove(curMD));

            // REMOVE all deleted CounterDatas from Bill
            var countDatasIds = bill.CounterDatas.Select(x => x.Id).ToList();

            foreach (var curCD in currentBill.CounterDatas.Where(c => !countDatasIds.Contains(c.Id)).ToList())
            {
                // BEFORE remove CELL of LINK (SET), we must relate next and previous CELLS
                var countDataNext = this.context.CounterDatas.FirstOrDefault(c => c.LastCounterDataId == curCD.Id);
                if (countDataNext != null)
                {
                    countDataNext.LastCounterDataId = curCD.LastCounterDataId;
                }

                this.context.CounterDatas.Remove(curCD);
            }

            this.context.Commit();
        }
    }
}
