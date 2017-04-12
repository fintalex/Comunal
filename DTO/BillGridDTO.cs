using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BillGridDTO
    {
        public int Id { get; set; }

        public DateTime InvoiceDate { get; set; }

        public double Recalculation { get; set; }

        public double Fine { get; set; }
    }
}
