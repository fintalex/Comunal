using Data;
using System;
using System.Data.Entity;

namespace Domain
{
    public interface IDataContext : IDisposable
    {
        DbSet<Flat> Flats { get; set; }

        DbSet<Counter> Counters { get; set; }

        DbSet<CounterType> CounterTypes { get; set; }

        DbSet<CounterTarif> CounterTarifs { get; set; }

        DbSet<Unit> Units { get; set; }

        DbSet<CounterData> CounterDatas { get; set; }

        DbSet<User> Users { get; set; }

        /// <summary>
        /// Commit changes to database
        /// </summary>
        void Commit();

        /// <summary>
        /// Revert database changes
        /// </summary>
        void Rollback();
    }
}
