using Data;
using System.Linq;

namespace Services.Interfaces
{
    public interface ICounterService
    {
        /// <summary>
        /// Create a new Counter
        /// </summary>
        /// <param name="counter">Counter for creating</param>
        void CreateCounter(Counter counter);

        /// <summary>
        /// Get Counter by id
        /// </summary>
        /// <param name="id">Id of counter</param>
        /// <returns>Counter</returns>
        Counter GetById(int id);

        /// <summary>
        /// Get All Counters (then it will be by UserId)
        /// </summary>
        /// <returns></returns>
        IQueryable<Counter> GetCounters();

        /// <summary>
        /// Delete Counter by id
        /// </summary>
        /// <param name="id">Counter id</param>
        void DeleteCounter(int id);

        /// <summary>
        /// Add counter
        /// </summary>
        /// <param name="counter">counter</param>
        Counter AddCounter(Counter counter);

        /// <summary>
        /// Update counter
        /// </summary>
        /// <param name="counter">Counter</param>
        void UpdateCounter(Counter counter);
    }
}