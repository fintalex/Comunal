﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/bills")]
    public class BillsController : ApiController
    {
        private readonly IBillService billService;

        public BillsController(IBillService billService)
        {
            this.billService = billService;
        }

        [HttpGet]
        public BillDetailDTO Get(int id)
        {
            return Mapper.Map<BillDetailDTO>(this.billService.GetById(id));
        }

        [HttpGet]
        [Route("{flatId}")]
        public IQueryable<BillGridDTO> GetBillsByFlatId(int flatId)
        {
            return this.billService.GetBills(flatId).ProjectTo<BillGridDTO>();
        }

        [HttpPost]
        public Bill AddBill([FromBody]Bill newBill)
        {
            return this.billService.AddBill(newBill);
        }

        [HttpPut]
        public void UpdateBill(Bill bill)
        {
            this.billService.UpdateBill(bill);
        }

        [HttpDelete]
        public void DeleteBill(int billId)
        {
            this.billService.DeleteBill(billId);
        }
    }
}