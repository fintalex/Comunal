using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Collections.Generic;
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

        [HttpGet]
        [Route("byBillId/{billId:int}")]
        public IQueryable<CounterDataDTO> GetCounterDatasByBillId(int billId)
        {
            var counterDatas = this.counterDataService.GetCounterDatasByBill(billId);
            var counterDatasList = counterDatas.ProjectTo<CounterDataDTO>();
            return counterDatasList;
        }

        [HttpGet]
        [Route("forNewBill/{flatId:int}")]
        public IQueryable<CounterDataDTO> GetCounterDatasForNewBill(int flatId)
        {
            var counterDatasList = this.counterDataService.GetCounterDatasForNewBill(flatId).ProjectTo<CounterDataDTO>();
            return counterDatasList;
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