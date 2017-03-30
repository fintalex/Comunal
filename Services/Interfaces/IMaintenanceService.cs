using System.Linq;
using Data;

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
		Maintenance AddMaintenance(Maintenance maintenance);

		/// <summary>
		/// Update Maintenance
		/// </summary>
		/// <param name="maintenance">Maintenance</param>
		void UpdateMaintenance(Maintenance maintenance);
	}
}
