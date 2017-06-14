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
                    .ForMember(x => x.InvoiceDateMonth, c => c.MapFrom(o => o.InvoiceDate.Month - 1 ))
                    .ForMember(x => x.InvoiceDateYear, c => c.MapFrom(o => o.InvoiceDate.Year))
                    .ForMember(x => x.InvoiceDateDay, c => c.MapFrom(o => o.InvoiceDate.Day));
                cfg.CreateMap<BillDetailDTO, Bill>()
                    .ForMember(x => x.InvoiceDate, c => c.MapFrom(o => new DateTime(o.InvoiceDateYear, o.InvoiceDateMonth + 1, 1)));

                cfg.CreateMap<Counter, CounterDTO>()
                    .ForMember(x => x.IconPath, c => c.MapFrom(o => o.CounterType.IconPath))
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
                    .ForMember(x => x.CounterTypeId, c => c.MapFrom(o => o.Counter.CounterTypeId))
                    .ForMember(x => x.TarifCount, c => c.MapFrom(o => o.CounterTarif.TarifCount))
                    .ForMember(x => x.Tarif1, c => c.MapFrom(o => o.CounterTarif.Tarif1))
                    .ForMember(x => x.Limit1, c => c.MapFrom(o => o.CounterTarif.Limit1))
                    .ForMember(x => x.Tarif2, c => c.MapFrom(o => o.CounterTarif.Tarif2))
                    .ForMember(x => x.Limit2, c => c.MapFrom(o => o.CounterTarif.Limit2))
                    .ForMember(x => x.Tarif3, c => c.MapFrom(o => o.CounterTarif.Tarif3))
                    .ForMember(x => x.CounterName, c => c.MapFrom(o => o.Counter.Name))
                    .ForMember(x => x.CounterId, c => c.MapFrom(o => o.Counter.Id))
                    .ForMember(x => x.ReadingDateDay, c => c.MapFrom(o => o.ReadingDate.Day))
                    .ForMember(x => x.ReadingDateMonth, c => c.MapFrom(o => o.ReadingDate.Month - 1))
                    .ForMember(x => x.ReadingDateYear, c => c.MapFrom(o => o.ReadingDate.Year))
                    .ForMember(x => x.IconPath, c => c.MapFrom(o => o.Counter.CounterType.IconPath))
                    .ForMember(x => x.EnableODN, c => c.MapFrom(o => o.Counter.EnableODN))
                    .ForMember(x => x.ReadingODN, c => c.MapFrom(o => o.ReadingODN == null ? 0 : o.ReadingODN))
                    .ForMember(x => x.LastCounterDataDTO, c => c.MapFrom(o => o.LastCounterData));
                cfg.CreateMap<CounterDataDTO, CounterData>()
                    .ForMember(x => x.ReadingDate, c => c.MapFrom(o => new DateTime(o.ReadingDateYear, o.ReadingDateMonth + 1, o.ReadingDateDay)))
                    .ForMember(x => x.CounterTarif, c => c.MapFrom(o => new CounterTarif() {
                        Tarif1 = o.Tarif1,
                        Tarif2 = o.Tarif2,
                        Tarif3 = o.Tarif3,
                        Limit1 = o.Limit1,
                        Limit2 = o.Limit2,
                        TarifCount = o.TarifCount
                    }));

                cfg.CreateMap<CounterData, CounterDataShortDTO>()
                    .ForMember(x => x.CounterTarifId, c => c.MapFrom(o => o.CounterTarif.Id))
                    .ForMember(x => x.TarifCount, c => c.MapFrom(o => o.CounterTarif.TarifCount))
                    .ForMember(x => x.Tarif1, c => c.MapFrom(o => o.CounterTarif.Tarif1))
                    .ForMember(x => x.Limit1, c => c.MapFrom(o => o.CounterTarif.Limit1))
                    .ForMember(x => x.Tarif2, c => c.MapFrom(o => o.CounterTarif.Tarif2))
                    .ForMember(x => x.Limit2, c => c.MapFrom(o => o.CounterTarif.Limit2))
                    .ForMember(x => x.Tarif3, c => c.MapFrom(o => o.CounterTarif.Tarif3))
                    .ForMember(x => x.EnableODN, c => c.MapFrom(o => o.Counter.EnableODN))
                    .ForMember(x => x.ReadingODN, c => c.MapFrom(o => o.ReadingODN == null ? 0 : o.ReadingODN));
                cfg.CreateMap<CounterDataShortDTO, CounterData>();

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

                cfg.CreateMap<MaintenanceData, MaintenanceDataDTO>()
                    .ForMember(x => x.Cost, c => c.MapFrom(o => o.MaintenanceTarif.Tarif))
                    .ForMember(x => x.Tarif, c => c.MapFrom(o => o.Maintenance.MaintenanceTarif.Tarif))
                    .ForMember(x => x.MaintenanceTarifId, c => c.MapFrom(o => o.MaintenanceTarif.Id))
                    .ForMember(x => x.MaintenanceName, c => c.MapFrom(o => o.Maintenance.Name))
                    .ForMember(x => x.MaintenanceId, c => c.MapFrom(o => o.Maintenance.Id))
                    .ForMember(x => x.Coefficient, c => c.MapFrom(o => o.Maintenance.Coefficient))
                    .ForMember(x => x.IconPath, c => c.MapFrom(o => o.Maintenance.MaintenanceType.IconPath))
                    .ForMember(x => x.InvoiceDate, c => c.MapFrom(o => o.Bill != null ? o.Bill.InvoiceDate : (DateTime?)null));
                cfg.CreateMap<MaintenanceDataDTO, MaintenanceData>();

                cfg.CreateMap<Bill, BillGridDTO>();

            });
        }
    }
}