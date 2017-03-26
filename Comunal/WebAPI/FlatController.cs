using Data;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    public class FlatController : ApiController
    {
        private readonly IFlatService flatService;
        
        public FlatController(IFlatService flatService)
        {
            this.flatService = flatService;
        }

        [HttpGet]
        public IQueryable<Flat> GetFlats()
        {
            //return new string[] { "value1", "value2" };
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

        [HttpPost]
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