using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BillDetailDTO
    {
        public int Id { get; set; }

        public int FlatId { get; set; }

        public int InvoiceDateMonth { get; set; }

        public int InvoiceDateYear { get; set; }

        public int InvoiceDateDay { get; set; }

        public DateTime InvoiceDate { get; set; }

        public double Fine { get; set; }

        public double Recalculation { get; set; }

        public string Comment { get; set; }

        public List<CounterDataDTO> CounterDatas { get; set; }

        public List<MaintenanceDataDTO> MaintenanceDatas { get; set; }
    }
}
