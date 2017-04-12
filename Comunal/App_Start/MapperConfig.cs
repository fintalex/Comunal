using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Data;
using DTO;

namespace Comunal
{
    public static class MapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg => {

                cfg.CreateMap<Counter, CounterDTO>();

                cfg.CreateMap<User, CurrentUserDTO>()
                    .ForMember(x => x.Flat, c => c.MapFrom(o => o.Flats.FirstOrDefault(f => f.Selected)));

                cfg.CreateMap<Flat, FlatDTO>();

                cfg.CreateMap<Maintenance, MaintenanceDTO>()
                    .ForMember(x => x.Tarif, c => c.MapFrom(o => o.MaintenanceTarifId.HasValue ? o.MaintenanceTarif.Tarif : 0))
                    .ForMember(x => x.Counters, c => c.MapFrom(o => o.Counters.Select(co => co.Id)));
                cfg.CreateMap<MaintenanceDTO, Maintenance>()
                    .ForMember(x => x.Coefficient, c => c.MapFrom(o => o.MaintenanceTypeId == (int)MaintenanceTypes.Fix || o.MaintenanceTypeId == (int)MaintenanceTypes.Sewerage ? 1 : o.Coefficient))
                    .ForMember(x => x.MaintenanceTarif, c => c.MapFrom(o => new MaintenanceTarif() { Tarif = o.Tarif }))
                    .ForMember(x => x.Counters, c => c.MapFrom(o => o.Counters.Select(co => new Counter() { Id = co })));

                cfg.CreateMap<Bill, BillGridDTO>();

            });
        }
    }
}