using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity.Migrations;
using System.Data.Entity.Migrations.Infrastructure;
using Domain.Migrations;

namespace Comunal
{
    public class EFmigrationForDB
    {
        public static void SeedDB()
        {
            var seeds = new MigrationsConfiguration();
            var migrator = new DbMigrator(seeds);
            migrator.Update();
        }
    }
}