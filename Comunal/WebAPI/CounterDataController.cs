using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System;
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
        public CounterDataDTO Get(int id)
        {
            var countData = this.counterDataService.GetById(id);

            var countDataDTO = Mapper.Map<CounterDataDTO>(countData);

            return countDataDTO;
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
        [Route("byCounterId/{counterId:int}")]
        public IQueryable<CounterDataDTO> GetCounterDatasByCounterId(int counterId)
        {
            var counterDatas = this.counterDataService.GetCounterDatasByCounter(counterId);
            var counterDatasList = counterDatas.ProjectTo<CounterDataDTO>();
            return counterDatasList;
        }

        [HttpPost]
        [Route("forNewBill")]
        public IQueryable<CounterDataDTO> GetCounterDatasForNewBill(BillDetailDTO billDTO)
        {
            var curDateForBill = new DateTime(billDTO.InvoiceDateYear, billDTO.InvoiceDateMonth + 1, billDTO.InvoiceDateDay);
            var counterDatasList = this.counterDataService.GetCounterDatasForNewBill(billDTO.FlatId, curDateForBill).ProjectTo<CounterDataDTO>();
            return counterDatasList;
        }

        [HttpPost]
        [Route("changeTarif")]
        public void SenNewTarifForCounterDataOnly([FromBody]CounterDataDTO counterData)
        {
            var curCounterData = Mapper.Map<CounterData>(counterData);

            this.counterDataService.ChangeTarif(curCounterData);
        }

        [HttpGet]
        [Route("notAddedToBill/{flatId:int}/{billId:int}")]
        public IQueryable<CounterDataDTO> GetCounterDatasByBillId(int flatId, int billId)
        {
            var counterDatasNotInBill = this.counterDataService.GetCounterDatasNotAdded(flatId, billId);
            var counterDatasNotInBillDto = counterDatasNotInBill.ProjectTo<CounterDataDTO>();
            return counterDatasNotInBillDto;
        }

        [HttpDelete]
        [Route("")]
        public void DeleteCounterData(int id)
        {
            this.counterDataService.DeleteCounterData(id);
        }

        [HttpDelete]
        [Route("byCounterId/{counterId:int}")]
        public void DeleteAllCounterDatas(int counterId)
        {
            this.counterDataService.DeleteAllCounterDatas(counterId);
        }
    }
}