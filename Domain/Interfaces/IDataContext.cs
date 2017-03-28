using Data;
using System;
using System.Data.Entity;

namespace Domain
{
    public interface IDataContext : IDisposable
    {
        IDbSet<Flat> Flats { get; set; }

        IDbSet<Counter> Counters { get; set; }

        IDbSet<CounterType> CounterTypes { get; set; }

        IDbSet<CounterTarif> CounterTarifs { get; set; }

        IDbSet<Unit> Units { get; set; }

        IDbSet<CounterData> CounterDatas { get; set; }

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
