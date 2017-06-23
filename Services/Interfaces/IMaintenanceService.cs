using System.Linq;
using Data;
using System.Collections.Generic;

namespace Services.Interfaces
{
	public interface IMaintenanceService
	{
		/// <summary>
		/// Get Maintenance by Id
		/// </summary>
		/// <param name="id">Id of Maintenance</param>
		/// <returns>Counter</returns>
		Maintenance GetById(int id);

		/// <summary>
		/// Get all Maintenances
		/// </summary>
		/// <returns></returns>
		IQueryable<Maintenance> GetMaintenances(int flatId);

		/// <summary>
		/// Delete Maintenance by id
		/// </summary>
		/// <param name="id">Maintenance id</param>
		void DeleteMaintenance(int id);

        /// <summary>
        /// Add Maintenance
        /// </summary>
        /// <param name="maintenance">Maintenance</param>
        /// <param name="countersId">Counters Ids</param>
        Maintenance AddMaintenance(Maintenance maintenance, List<int> countersId);

        /// <summary>
        /// Update Maintenance
        /// </summary>
        /// <param name="maintenance">Maintenance</param>
        /// <param name="countersId">Counters Ids</param>
        Maintenance UpdateMaintenance(Maintenance maintenance, List<int> countersId);

        /// <summary>
        /// Update maintenance tarif
        /// </summary>
        /// <param name="maintenanceTarif">maintenanceTarif</param>
        void UpdateTarif(MaintenanceTarif maintenanceTarif);
    }
}
