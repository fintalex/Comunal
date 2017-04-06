using Data;
using System.Linq;

namespace Services.Interfaces
{
    public interface IFlatService
    {
        /// <summary>
        /// Create a new Flat
        /// </summary>
        /// <param name="flat">Flat for creating</param>
        void CreateFlat(Flat flat);

        /// <summary>
        /// Get Flat by id
        /// </summary>
        /// <param name="id">Id of flat</param>
        /// <returns>Flat</returns>
        Flat GetById(int id);

        /// <summary>
        /// Get All Flats (then it will be by UserId)
        /// </summary>
        /// <returns></returns>
        IQueryable<Flat> GetFlats();

        /// <summary>
        /// Get All Flats by user (then it will be by UserId)
        /// </summary>
        /// <returns></returns>
        IQueryable<Flat> GetUserFlats(int userId);

        /// <summary>
        /// Delete Flat by id
        /// </summary>
        /// <param name="id">Flat id</param>
        void DeleteFlat(int id);

        /// <summary>
        /// Add flat
        /// </summary>
        /// <param name="flat">flat</param>
        Flat AddFlat(Flat flat);

        /// <summary>
        /// Update flat
        /// </summary>
        /// <param name="flat">Flat</param>
        void UpdateFlat(Flat flat);

        /// <summary>
        /// Select flat
        /// </summary>
        /// <param name="flat">Selected Flat</param>
        void SelectFlat(Flat flat);
    }
}