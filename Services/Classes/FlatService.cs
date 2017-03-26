using Data;
using Domain;
using System.Linq;
using Services.Interfaces;
using System.Data.Entity;

namespace Services.Classes
{
    public class FlatService : IFlatService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Flat service constructor
        /// </summary>
        /// <param name="context">Data context</param>
        public FlatService(IDataContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Create a new Flat
        /// </summary>
        /// <param name="flat">Flat for creating</param>
        public void CreateFlat(Flat flat)
        {
            this.context.Flats.Add(flat);
        }

        /// <summary>
        /// Get Flat by id
        /// </summary>
        /// <param name="id">Id of flat</param>
        /// <returns>Flat</returns>
        public Flat GetById(int id)
        {
            return this.context.Flats.FirstOrDefault(f=>f.Id == id);
        }

        /// <summary>
        /// Get All Flats (then it will be by UserId)
        /// </summary>
        /// <returns></returns>
        public IQueryable<Flat> GetFlats()
        {
            return this.context.Flats;
        }

        /// <summary>
        /// Delete Flat by id
        /// </summary>
        /// <param name="id">Flat id</param>
        public void DeleteFlat(int id)
        {
            var flat = this.context.Flats.FirstOrDefault(x => x.Id == id);
            this.context.Flats.Remove(flat);
            this.context.Commit();
        }

        /// <summary>
        /// Add flat
        /// </summary>
        /// <param name="flat">flat</param>
        public Flat AddFlat(Flat flat)
        {
            this.context.Flats.Add(flat);
            this.context.Commit();

            return flat;
        }

        /// <summary>
        /// Update flat
        /// </summary>
        /// <param name="flat">Flat</param>
        public void UpdateFlat(Flat flat)
        {
            var currentFlat = this.context.Flats.FirstOrDefault(f => f.Id == flat.Id);
            currentFlat.Name = flat.Name;
            currentFlat.Address = flat.Address;

            this.context.Commit();
        }
    }
}
