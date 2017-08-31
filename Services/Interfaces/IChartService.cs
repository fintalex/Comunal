using Data;
using DTO;
using System.Linq;

namespace Services.Interfaces
{
    public interface IChartService
    {
        /// <summary>
        /// Get date for Diagram expense
        /// </summary>
        /// <param name="inputDTO">Input Data</param>
        /// <returns>Data for diagram</returns>
        IQueryable<DiagramExpenseDTO> GetDiagrameExpenses(InputChartDataDTO inputDTO);

        /// <summary>
        /// Get CounterData for Diagram expense
        /// </summary>
        /// <param name="inputDTO">Input Data</param>
        /// <returns>Data for diagram</returns>
        IQueryable<CounterData> GetCounterDataForDiagrameExpenses(InputChartDataDTO inputDTO);
    }
}