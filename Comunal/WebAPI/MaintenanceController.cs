using AutoMapper.QueryableExtensions;
using Data;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
	[RoutePrefix("api/maintenances")]
	public class MaintenancesController : ApiController
	{
		private readonly IMaintenanceService maintenanceService;

		public MaintenancesController(IMaintenanceService maintenanceService)
		{
			this.maintenanceService = maintenanceService;
		}

		[HttpGet]
		public Maintenance Get(int id)
		{
			return this.maintenanceService.GetById(id);
		}

		[HttpPost]
		public Maintenance AddMaintenance([FromBody]Maintenance newMaintenance)
		{
			return this.maintenanceService.AddMaintenance(newMaintenance);
		}

		[HttpPut]
		public void UpdateMaintenance(Maintenance maintenance)
		{
			this.maintenanceService.UpdateMaintenance(maintenance);
		}

		[HttpDelete]
		public void DeleteMaintenance(int id)
		{
			this.maintenanceService.DeleteMaintenance(id);
		}
	}
}