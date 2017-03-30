using Data;
using Domain;
using System.Linq;
using Services.Interfaces;

namespace Services.Classes
{
	public class CounterService : ICounterService
	{
		private readonly IDataContext context;

		/// <summary>
		/// Counter service constructor
		/// </summary>
		/// <param name="context">Data context</param>
		public CounterService(IDataContext context)
		{
			this.context = context;
		}

		/// <summary>
		/// Get Counter by id
		/// </summary>
		/// <param name="id">Id of counter</param>
		/// <returns>Counter</returns>
		public Counter GetById(int id)
		{
			return this.context.Counters.FirstOrDefault(f => f.Id == id);
		}

		/// <summary>
		/// Get All Counters (then it will be by UserId)
		/// </summary>
		/// <returns></returns>
		public IQueryable<Counter> GetCounters()
		{
			return this.context.Counters;
		}

		/// <summary>
		/// Delete Counter by id
		/// </summary>
		/// <param name="id">Counter id</param>
		public void DeleteCounter(int id)
		{
			var counter = this.context.Counters.FirstOrDefault(x => x.Id == id);
			this.context.Counters.Remove(counter);
			this.context.Commit();
		}

		/// <summary>
		/// Add counter
		/// </summary>
		/// <param name="counter">counter</param>
		public Counter AddCounter(Counter counter)
		{
			//TODO: when will be current session with current chosen FLAT
			if (counter.FlatId == 0)
			{
				counter.FlatId = this.context.Flats.FirstOrDefault().Id;
			}
			this.context.Counters.Add(counter);
			this.context.Commit();

			return counter;
		}

		/// <summary>
		/// Update counter
		/// </summary>
		/// <param name="counter">Counter</param>
		public void UpdateCounter(Counter counter)
		{
			var currentCounter = this.context.Counters.FirstOrDefault(f => f.Id == counter.Id);
			currentCounter.Name = counter.Name;
			currentCounter.EnableODN = counter.EnableODN;
			currentCounter.SortOrder = counter.SortOrder;
			currentCounter.UnitConvertCoefficient = counter.UnitConvertCoefficient;
			currentCounter.CounterTarifId = counter.CounterTarifId;

			this.context.Commit();
		}
	}
}
