using Data;
using Domain;
using System.Linq;
using Services.Interfaces;

namespace Services.Classes
{
    public class MaintenanceService : IMaintenanceService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Maintenance service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public MaintenanceService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Get Maintenance by Id
        /// </summary>
        /// <param name="id">Id of Maintenance</param>
        /// <returns>Counter</returns>
        public Maintenance GetById(int id)
        {
            return this.context.Maintenances.FirstOrDefault(m => m.Id == id);
        }

        /// <summary>
        /// Get all Maintenances
        /// </summary>
        /// <returns></returns>
        public IQueryable<Maintenance> GetMaintenances(int flatId)
        {
            return this.context.Maintenances
                .Where(m => m.FlatId == flatId)
                .OrderBy(m => m.SortOrder)
                .ThenBy(m => m.Name); ;
        }

        /// <summary>
        /// Delete Maintenance by id
        /// </summary>
        /// <param name="id">Maintenance id</param>
        public void DeleteMaintenance(int id)
        {
            var maintenance = this.context.Maintenances.FirstOrDefault(m => m.Id == id);
            this.context.Maintenances.Remove(maintenance);
            this.context.Commit();
        }

        /// <summary>
        /// Add Maintenance
        /// </summary>
        /// <param name="maintenance">Maintenance</param>
        public Maintenance AddMaintenance(Maintenance maintenance)
        {
            //TODO: when will be current session with current chosen FLAT
            if (maintenance.FlatId == 0)
            {
                maintenance.FlatId = this.context.Flats.FirstOrDefault().Id;
            }
            this.context.Maintenances.Add(maintenance);
            this.context.Commit();

            return maintenance;
        }

        /// <summary>
        /// Update Maintenance
        /// </summary>
        /// <param name="maintenance">Maintenance</param>
        public void UpdateMaintenance(Maintenance maintenance)
        {
            var currentMaintenance = this.context.Maintenances.FirstOrDefault(m => m.Id == maintenance.Id);
            currentMaintenance.Name = maintenance.Name;
            currentMaintenance.Coefficient = maintenance.Coefficient;
            currentMaintenance.SortOrder = maintenance.SortOrder;

            // If maintenance don't have a Tarif or We set New  Tarif Value - we should create a new Tarif. And not rewrite
            if (!currentMaintenance.MaintenanceTarifId.HasValue || currentMaintenance.MaintenanceTarif.Tarif != maintenance.MaintenanceTarif.Tarif)
            {
                currentMaintenance.MaintenanceTarif = new MaintenanceTarif() { Tarif = maintenance.MaintenanceTarif.Tarif };
            }

            this.context.Commit();
        }
    }
}
