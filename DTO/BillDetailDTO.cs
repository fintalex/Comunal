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

        public int InvoiceDateMonth { get; set; }

        public int InvoiceDateYear { get; set; }

        public double Fine { get; set; }

        public double Recalculation { get; set; }

        public string Comment { get; set; }

        //public List<CounterData> CounterDatas { get; set; }

        //public List<MaintenanceData> MaintenanceDatas { get; set; }
    }
}
