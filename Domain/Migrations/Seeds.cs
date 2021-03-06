﻿using Data;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Migrations
{
    public class MigrationsConfiguration : DbMigrationsConfiguration<DataContext>
    {
        public MigrationsConfiguration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(DataContext context)
        {
            if (!context.Units.Any())
            {
                SeedUnits(context);
            }

            if (!context.CounterTypes.Any())
            {
                SeedCounterTypes(context);
            }

            if (!context.MaintenanceTypes.Any())
            {
                SeedMaintenanceTypes(context);
            }

            //if (!context.Flats.Any())
            //{
            //    SeedFlats(context);
            //}

            //if (!context.Counters.Any())
            //{
            //    SeedCounters(context);
            //}
        }

        private static void SeedUnits(DataContext context)
        {
            context.Units.AddOrUpdate(new Unit { Id = (int)UnitTypes.MetersCubic, Name = "m3" });
            context.Units.AddOrUpdate(new Unit { Id = (int)UnitTypes.KilowattPerHour, Name = "кВт/ч" });
            context.Units.AddOrUpdate(new Unit { Id = (int)UnitTypes.MotorHour, Name = "мтч" });
            context.Commit();
        }

        private static void SeedCounterTypes(DataContext context)
        {
            context.CounterTypes.AddOrUpdate(new CounterType { Id = (int)CounterTypes.ColdWater, Name = "Холодная вода", UnitId = (int)UnitTypes.MetersCubic, IconPath = "Content/CounterTypes/coldwater.png" });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = (int)CounterTypes.HotWater, Name = "Горячая вода",  UnitId = (int)UnitTypes.MetersCubic, IconPath = "Content/CounterTypes/hotwater.png" });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = (int)CounterTypes.Electricity, Name = "Электричество", UnitId = (int)UnitTypes.KilowattPerHour, IconPath = "Content/CounterTypes/energy.png" });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = (int)CounterTypes.Gas, Name = "Газ", UnitId = (int)UnitTypes.MetersCubic, IconPath = "Content/CounterTypes/gas.png" });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = (int)CounterTypes.Heating, Name = "Отопление", UnitId = (int)UnitTypes.MetersCubic, IconPath = "Content/CounterTypes/heat.png" });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = (int)CounterTypes.MotorResource, Name = "Моторесурс", UnitId = (int)UnitTypes.MotorHour, IconPath = "Content/CounterTypes/moto.png" });
            context.SaveChanges();
        }

        private static void SeedMaintenanceTypes(DataContext context)
        {
            context.MaintenanceTypes.AddOrUpdate(new MaintenanceType { Id = (int)MaintenanceTypes.Fix, Name = "Фиксированная стоимость", IconPath = "Content/ServiceTypes/fix.png" });
            context.MaintenanceTypes.AddOrUpdate(new MaintenanceType { Id = (int)MaintenanceTypes.Coefficient, Name = "По количеству жильцов/площади", IconPath = "Content/ServiceTypes/multi.png" });
            context.MaintenanceTypes.AddOrUpdate(new MaintenanceType { Id = (int)MaintenanceTypes.Sewerage, Name = "Водоотведение", IconPath = "Content/ServiceTypes/waters.png" });
            context.MaintenanceTypes.AddOrUpdate(new MaintenanceType { Id = (int)MaintenanceTypes.WaterHeating, Name = "Подогрев воды", IconPath = "Content/ServiceTypes/cooler.png" });
            context.SaveChanges();
        }

        private static void SeedFlats(DataContext context)
        {
            context.Flats.AddOrUpdate(new Flat { Id = 1, Name = "Первая квартира", Address = "Стачки 23" });
            context.Flats.AddOrUpdate(new Flat { Id = 2, Name = "Вторая квартира", Address = "Мадояна 68" });
            context.Flats.AddOrUpdate(new Flat { Id = 3, Name = "Третья квартира", Address = "Ленина 51" });
            context.SaveChanges();
        }

        private static void SeedCounters(DataContext context)
        {
            context.Counters.AddOrUpdate(new Counter { Id = 1, Name = "Холодная вода в туалете", CounterTypeId = (int)CounterTypes.ColdWater, FlatId = 1, SortOrder = 1, UnitConvertCoefficient = 1 });
            context.Counters.AddOrUpdate(new Counter { Id = 2, Name = "Горячая вода в туалете", CounterTypeId = (int)CounterTypes.HotWater, FlatId = 1, SortOrder = 1, UnitConvertCoefficient = 1 });
            context.Counters.AddOrUpdate(new Counter { Id = 3, Name = "Электросчетчик в подъезде", CounterTypeId = (int)CounterTypes.Electricity, FlatId = 1, SortOrder = 1, UnitConvertCoefficient = 1 });
            context.Counters.AddOrUpdate(new Counter { Id = 4, Name = "Электросчетчик в гараже", CounterTypeId = (int)CounterTypes.Electricity, FlatId = 1, SortOrder = 1, UnitConvertCoefficient = 1 });
            context.SaveChanges();
        }
    }
}
