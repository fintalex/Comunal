using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

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
        public CounterDTO Get(int id)
        {
            return Mapper.Map<CounterDTO>(this.counterService.GetById(id));
        }

        [HttpGet]
        [Route("{flatId}")]
        public IQueryable<CounterDTO> GetCountersByFlatId(int flatId)
        {
            // а здесь надо бы проверку делать, имеет ли доступ Текущий авторизованный пользователь к данной квартире
            return this.counterService.GetCounters(flatId).ProjectTo<CounterDTO>();
        }

        [HttpGet]
        [Route("waters/{flatId}")]
        public IQueryable<CounterDTO> GetWaterCountersByFlatId(int flatId)
        {
            // а здесь надо бы проверку делать, имеет ли доступ Текущий авторизованный пользователь к данной квартире
            return this.counterService.GetWaterCounters(flatId).ProjectTo<CounterDTO>();
        }

        [HttpPost]
        public CounterDTO AddCounter([FromBody]CounterDTO counterDto)
        {
            var newCounter = Mapper.Map<Counter>(counterDto);
            return Mapper.Map<CounterDTO>(this.counterService.AddCounter(newCounter));
        }

        [HttpPut]
        public void UpdateCounter(CounterDTO counterDto)
        {
            var editedCounter = Mapper.Map<Counter>(counterDto);
            this.counterService.UpdateCounter(editedCounter);
        }

        [HttpDelete]
        [Route("{counterId}")]
        public void DeleteCounter(int counterId)
        {
            this.counterService.DeleteCounter(counterId);
        }
    }
}