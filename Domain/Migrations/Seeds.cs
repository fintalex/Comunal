using Data;
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
            context.CounterTypes.AddOrUpdate(new CounterType { Id = 1, Name = "Холодная вода", UnitId = (int)UnitTypes.MetersCubic });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = 2, Name = "Горячая вода", UnitId = (int)UnitTypes.MetersCubic });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = 3, Name = "Электричество", UnitId = (int)UnitTypes.KilowattPerHour });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = 4, Name = "Газ", UnitId = (int)UnitTypes.MetersCubic });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = 5, Name = "Отопление", UnitId = (int)UnitTypes.MetersCubic });
            context.CounterTypes.AddOrUpdate(new CounterType { Id = 6, Name = "Моторесурс", UnitId = (int)UnitTypes.MotorHour });
            context.SaveChanges();
        }
    }
}
