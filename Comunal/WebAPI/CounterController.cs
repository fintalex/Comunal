using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;
using AutoMapper.QueryableExtensions;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/counters")]
    public class CountersController : ApiController
    {
        private readonly ICounterService counterService;

        public CountersController(ICounterService counterService)
        {
            this.counterService = counterService;
        }

        [HttpGet]
        public Counter Get(int id)
        {
            return this.counterService.GetById(id);
        }

        [HttpGet]
        [Route("{flatId}")]
        public IQueryable<CounterDTO> GetCountersByFlatId(int flatId)
        {
            // а здесь надо бы проверку делать, имеет ли доступ Текущий авторизованный пользователь к данной квартире
            return this.counterService.GetCounters(flatId).ProjectTo<CounterDTO>();
        }

        [HttpPost]
        public Counter AddCounter([FromBody]Counter newCounter)
        {
            return this.counterService.AddCounter(newCounter);
        }

        [HttpPut]
        public void UpdateCounter(Counter counter)
        {
            this.counterService.UpdateCounter(counter);
        }

        [HttpDelete]
        public void DeleteCounter(int id)
        {
            this.counterService.DeleteCounter(id);
        }
    }
}