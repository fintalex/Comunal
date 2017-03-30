using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using AutoMapper.QueryableExtensions;

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
        [Route("byuser/{userId:int}")]
        public IQueryable<FlatDTO> GetFlats(int userId)
        {
            return this.flatService.GetUserFlats(userId).ProjectTo<FlatDTO>();
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