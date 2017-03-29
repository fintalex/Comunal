using Data;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/flats")]
    public class FlatsController : ApiController
    {
        private readonly IFlatService flatService;
        
        public FlatsController(IFlatService flatService)
        {
            this.flatService = flatService;
        }

        [HttpGet]
        public IQueryable<Flat> GetFlats()
        {
            return this.flatService.GetFlats();
        }

        [HttpGet]
        public Flat Get(int id)
        {
            return this.flatService.GetById(id);
        }

        [HttpPost]
        public Flat AddFlat([FromBody]Flat newFlat)
        {
            return this.flatService.AddFlat(newFlat);
        }

        [HttpPut]
        public void UpdateFlat(Flat flat)
        {
            this.flatService.UpdateFlat(flat);
        }

        [HttpDelete]
        public void DeleteFlat(int id)
        {
            this.flatService.DeleteFlat(id);
        }
    }
}