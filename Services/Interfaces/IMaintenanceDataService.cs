using System.Linq;
using Data;
using System.Collections.Generic;

namespace Services.Interfaces
{
	public interface IMaintenanceDataService
    {
        /// <summary>
        /// Get Maintenance by Id
        /// </summary>
        /// <param name="id">Id of Maintenance Data</param>
        /// <returns>Maintenance</returns>
        MaintenanceData GetById(int id);

        /// <summary>
        /// Delete maintenanceData by id
        /// </summary>
        /// <param name="id">Maintenance Data id</param>
        void DeleteMaintenance(int id);

        /// <summary>
		/// Get MaintenanceData by BillId
		/// </summary>
		/// <param name="billId">billId</param>
		/// <returns>Maintenance Data</returns>
		IQueryable<MaintenanceData> GetMaintenanceDatasByBill(int billId);

        /// <summary>
        /// Get MaintenanceData for new Bill
        /// </summary>
        /// <param name="flatId">Flat id</param>
        /// <returns>List of empty Maintenance Data</returns>
		IQueryable<MaintenanceData> GetMaintenanceDatasForNewBill(int flatId);

        /// <summary>
        /// Get Maintenance Data By MaintenanceId
        /// </summary>
        /// <param name="maintenanceId">Maintenance Id</param>
        /// <returns>Maintenance Datas</returns>
        IQueryable<MaintenanceData> GetMaintenanceDatasByMaintenance(int maintenanceId);
    }
}
