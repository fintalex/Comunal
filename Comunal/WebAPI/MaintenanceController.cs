﻿using AutoMapper;
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
		public MaintenanceDTO AddMaintenance([FromBody]MaintenanceDTO newMaintenance)
		{ 
            var maintenance = Mapper.Map<Maintenance>(newMaintenance);
			var addedMaintaince = this.maintenanceService.AddMaintenance(maintenance, newMaintenance.Counters == null ? null : newMaintenance.Counters.ToList());
            return Mapper.Map<MaintenanceDTO>(addedMaintaince);
		}

        [HttpPost]
        [Route("updateTarif")]
        public void UpdateMaintenanceDataTarif([FromBody]MaintenanceTarifDTO maintenanceTarifDTO)
        {
            var maintenanceTarif = Mapper.Map<MaintenanceTarif>(maintenanceTarifDTO);
            this.maintenanceService.UpdateTarif(maintenanceTarif);
        }

        [HttpPut]
		public MaintenanceDTO UpdateMaintenance(MaintenanceDTO maintenanceDTO)
		{
            var maintenance = Mapper.Map<Maintenance>(maintenanceDTO);
            var updatedMaintenance = this.maintenanceService.UpdateMaintenance(maintenance, maintenanceDTO.Counters.ToList());
            return Mapper.Map<MaintenanceDTO>(updatedMaintenance);
		}

		[HttpDelete]
        [Route("{maintenanceId}")]
        public void DeleteMaintenance(int maintenanceId)
		{
			this.maintenanceService.DeleteMaintenance(maintenanceId);
		}
	}
}