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

                cfg.CreateMap<Bill, BillDetailDTO>()
                    .ForMember(x => x.InvoiceDateMonth, c => c.MapFrom(o => o.InvoiceDate.Month))
                    .ForMember(x => x.InvoiceDateYear, c => c.MapFrom(o => o.InvoiceDate.Year));
                cfg.CreateMap<BillDetailDTO, Bill>();

                cfg.CreateMap<Counter, CounterDTO>()
                    .ForMember(x => x.TarifCount, c => c.MapFrom(o => o.CounterTarif.TarifCount))
                    .ForMember(x => x.Tarif1, c => c.MapFrom(o => o.CounterTarif.Tarif1))
                    .ForMember(x => x.Limit1, c => c.MapFrom(o => o.CounterTarif.Limit1))
                    .ForMember(x => x.Tarif2, c => c.MapFrom(o => o.CounterTarif.Tarif2))
                    .ForMember(x => x.Limit2, c => c.MapFrom(o => o.CounterTarif.Limit2))
                    .ForMember(x => x.Tarif3, c => c.MapFrom(o => o.CounterTarif.Tarif3));
                cfg.CreateMap<CounterDTO, Counter>()
                    .ForMember(x => x.CounterTarif, c => c.MapFrom(o => 
                        new CounterTarif { Limit1 = o.Limit1.HasValue ? o.Limit1.Value : 0,
                                           Limit2 = o.Limit2.HasValue ? o.Limit2.Value : 0,
                                           Tarif1 = o.Tarif1.HasValue ? o.Tarif1.Value : 0,
                                           Tarif2 = o.Tarif2.HasValue ? o.Tarif2.Value : 0,
                                           Tarif3 = o.Tarif3.HasValue ? o.Tarif3.Value : 0,
                                           TarifCount = o.TarifCount.HasValue ? o.TarifCount.Value : 0 }));

                cfg.CreateMap<CounterData, CounterDataDTO>()
                    .ForMember(x => x.CounterTarifId, c => c.MapFrom(o => o.CounterTarif.Id))
                    .ForMember(x => x.TarifCount, c => c.MapFrom(o => o.CounterTarif.TarifCount))
                    .ForMember(x => x.Tarif1, c => c.MapFrom(o => o.CounterTarif.Tarif1))
                    .ForMember(x => x.Limit1, c => c.MapFrom(o => o.CounterTarif.Limit1))
                    .ForMember(x => x.Tarif2, c => c.MapFrom(o => o.CounterTarif.Tarif2))
                    .ForMember(x => x.Limit2, c => c.MapFrom(o => o.CounterTarif.Limit2))
                    .ForMember(x => x.Tarif3, c => c.MapFrom(o => o.CounterTarif.Tarif3))
                    .ForMember(x => x.CounterName, c => c.MapFrom(o => o.Counter.Name))
                    .ForMember(x => x.CounterId, c => c.MapFrom(o => o.Counter.Id))
                    .ForMember(x => x.IconPath, c => c.MapFrom(o => o.Counter.CounterType.IconPath));
                cfg.CreateMap<CounterDataDTO, CounterData>();

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