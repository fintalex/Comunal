using Data;
using Domain;
using System.Linq;
using Services.Interfaces;
using System.Collections.Generic;

namespace Services.Classes
{
    public class MaintenanceDataService : IMaintenanceDataService
    {
        private readonly IDataContext context;

        /// <summary>
        /// MaintenanceData service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public MaintenanceDataService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Get Maintenance by Id
        /// </summary>
        /// <param name="id">Id of Maintenance Data</param>
        /// <returns>Maintenance</returns>
        public MaintenanceData GetById(int id)
        {
            return this.context.MaintenanceDatas.FirstOrDefault(m => m.Id == id);
        }

        /// <summary>
        /// Delete maintenanceData by id
        /// </summary>
        /// <param name="id">Maintenance Data id</param>
        public void DeleteMaintenance(int id)
        {
            var maintenanceData = this.context.MaintenanceDatas.FirstOrDefault(m => m.Id == id);
            this.context.MaintenanceDatas.Remove(maintenanceData);
            this.context.Commit();
        }

        /// <summary>
		/// Get MaintenanceData by BillId
		/// </summary>
		/// <param name="billId">billId</param>
		/// <returns>Maintenance Data</returns>
		public IQueryable<MaintenanceData> GetMaintenanceDatasByBill(int billId)
        {
            return this.context.MaintenanceDatas.Where(cd => cd.BillId == billId);
        }

        /// <summary>
        /// Get MaintenanceData for new Bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <returns>List of empty Maintenance Data</returns>
		public IQueryable<MaintenanceData> GetMaintenanceDatasForNewBill(int flatId)
        {
            var maintenanceDatas = new List<MaintenanceData>();
            var maintenances = this.context.Maintenances
                .Where(c => c.FlatId == flatId)
                .ToList();

            foreach (var curMaintenance in maintenances)
            {
                var newMaintenanceData = new MaintenanceData()
                {
                    Maintenance = curMaintenance,
                    MaintenanceTarif = curMaintenance.MaintenanceTarif,
                    BillId = 0
                };
                maintenanceDatas.Add(newMaintenanceData);
            }

            return maintenanceDatas.AsQueryable();
        }

        /// <summary>
        /// Get MaintenanceData Not added to bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <param name="billId">Bill id</param>
        /// <returns>List of empty Maintenance Data</returns>
		public IQueryable<MaintenanceData> GetMaintenanceDatasNotAdded(int flatId, int billId)
        {
            var maintenanceDatas = new List<MaintenanceData>();
            var maintenances = this.context.Maintenances
                .Where(c => c.FlatId == flatId)
                .ToList();

            var maintDataInBill = this.context.MaintenanceDatas.Where(cd => cd.BillId == billId).Select(m => m.MaintenanceId).ToList();

            foreach (var curMaintenance in maintenances.Where(m => !maintDataInBill.Contains(m.Id)))
            {
                var newMaintenanceData = new MaintenanceData()
                {
                    Maintenance = curMaintenance,
                    MaintenanceTarif = curMaintenance.MaintenanceTarif,
                    BillId = billId
                };
                maintenanceDatas.Add(newMaintenanceData);
            }

            return maintenanceDatas.AsQueryable();
        }

        /// <summary>
        /// Get Maintenance Data By MaintenanceId
        /// </summary>
        /// <param name="maintenanceId">Maintenance Id</param>
        /// <returns>Maintenance Datas</returns>
        public IQueryable<MaintenanceData> GetMaintenanceDatasByMaintenance(int maintenanceId)
        {
            return this.context.MaintenanceDatas
                .Where(m => m.MaintenanceId == maintenanceId)
                .OrderByDescending(m => m.Bill.InvoiceDate);
        }

    }
}
