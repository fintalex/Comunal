using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
	[RoutePrefix("api/MaintenanceDatas")]
	public class MaintenanceDatasController : ApiController
	{
		private readonly IMaintenanceDataService maintenanceDataService;

		public MaintenanceDatasController(IMaintenanceDataService maintenanceDataService)
		{
			this.maintenanceDataService = maintenanceDataService;
		}

        [HttpGet]
        [Route("byBillId/{billId:int}")]
        public IQueryable<MaintenanceDataDTO> GetMaintenanceDatasByBillId(int billId)
        {
            var maintenanceDatas = this.maintenanceDataService.GetMaintenanceDatasByBill(billId);
            var maintenanceDatasDto = maintenanceDatas.ProjectTo<MaintenanceDataDTO>();
            return maintenanceDatasDto;
        }

        [HttpGet]
        [Route("forNewBill/{flatId:int}")]
        public IQueryable<MaintenanceDataDTO> GetMaintenanceDatasForNewBill(int flatId)
        {
            var maintenanceDatasDto = this.maintenanceDataService.GetMaintenanceDatasForNewBill(flatId).ProjectTo<MaintenanceDataDTO>();
            return maintenanceDatasDto;
        }

        [HttpGet]
        [Route("byMaintenanceId/{maintenanceId:int}")]
        public IQueryable<MaintenanceDataDTO> GetMaintinanceDatasByMaintenanceId(int maintenanceId)
        {
            var maintenanceDatasDto = this.maintenanceDataService.GetMaintenanceDatasByMaintenance(maintenanceId).ProjectTo<MaintenanceDataDTO>();
            return maintenanceDatasDto;
        }
    }
}