using AutoMapper;
using AutoMapper.QueryableExtensions;
using Data;
using DTO;
using Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace Comunal.WebAPI
{
    [RoutePrefix("api/charts")]
    public class ChartsController : ApiController
    {
        private readonly IChartService chartService;

        public ChartsController(IChartService chartService)
        {
            this.chartService = chartService;
        }

        [HttpPost]
        public IQueryable<CounterDataDTO> GetDataForDiagramExpense(InputChartDataDTO inputDTO)
        {
            return this.chartService.GetCounterDataForDiagrameExpenses(inputDTO).ProjectTo<CounterDataDTO>();
        }
    }
}
