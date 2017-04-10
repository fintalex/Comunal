using AutoMapper.QueryableExtensions;
using Data;
using DTO;
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

        [HttpGet]
        [Route("{flatId}")]
        public IQueryable<MaintenanceDTO> GetMaintaincesByFlatId(int flatId)
        {
            // а здесь надо бы проверку делать, имеет ли доступ Текущий авторизованный пользователь к данной квартире
            return this.maintenanceService.GetMaintenances(flatId).ProjectTo<MaintenanceDTO>();
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
        [Route("{maintenanceId}")]
        public void DeleteMaintenance(int maintenanceId)
		{
			this.maintenanceService.DeleteMaintenance(maintenanceId);
		}
	}
}