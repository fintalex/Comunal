using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    public class CounterDataController : ApiController
    {
        private readonly ICounterDataService counterDataService;

        public CounterDataController(ICounterDataService counterDataService)
        {
            this.counterDataService = counterDataService;
        }

        [HttpGet]
        public CounterData Get(int id)
        {
            return this.counterDataService.GetById(id);
        }

        [HttpGet]
        public IQueryable<CounterData> GetCounterDatas(int counterId)
        {
            return this.counterDataService.GetCounterDatas(counterId);
        }

        [HttpPost]
        public CounterData AddCounterData([FromBody]CounterData newCounterData)
        {
            return this.counterDataService.AddCounterData(newCounterData);
        }

        [HttpPost]
        public void UpdateCounterData(CounterData counterData)
        {
            this.counterDataService.UpdateCounterData(counterData);
        }

        [HttpDelete]
        public void DeleteCounterData(int id)
        {
            this.counterDataService.DeleteCounterData(id);
        }

        [HttpDelete]
        public void DeleteAllCounterDatas(int counterId)
        {
            this.counterDataService.DeleteAllCounterDatas(counterId);
        }
    }
}