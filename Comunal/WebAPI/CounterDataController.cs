using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/CounterDatas")]
    public class CounterDatasController : ApiController
    {
        private readonly ICounterDataService counterDataService;

        public CounterDatasController(ICounterDataService counterDataService)
        {
            this.counterDataService = counterDataService;
        }

        [HttpGet]
        public CounterData Get(int id)
        {
            return this.counterDataService.GetById(id);
        }

        [HttpGet]
        [Route("byCounerId/{counterId:int}")]
        public IQueryable<CounterData> GetCounterDatas(int counterId)
        {
            return this.counterDataService.GetCounterDatas(counterId);
        }

        [HttpPost]
        public CounterData AddCounterData([FromBody]CounterData newCounterData)
        {
            return this.counterDataService.AddCounterData(newCounterData);
        }

        [HttpPut]
        public void UpdateCounterData(CounterData counterData)
        {
            this.counterDataService.UpdateCounterData(counterData);
        }

        [HttpDelete]
        [Route("")]
        public void DeleteCounterData(int id)
        {
            this.counterDataService.DeleteCounterData(id);
        }

        [HttpDelete]
        [Route("byCounerId/{counterId:int}")]
        public void DeleteAllCounterDatas(int counterId)
        {
            this.counterDataService.DeleteAllCounterDatas(counterId);
        }
    }
}