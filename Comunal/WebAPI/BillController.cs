using AutoMapper;
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
        public Bill Get(int id)
        {
            return this.billService.GetById(id);
        }

        [HttpGet]
        [Route("{flatId}")]
        public IQueryable<Bill> GetBillsByFlatId(int flatId)
        {
            return this.billService.GetBills(flatId);
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
