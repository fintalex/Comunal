using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MaintenanceDataDTO
    {
		public int Id { get; set; }

        public double Cost { get; set; }
        
        public int MaintenanceId { get; set; }

        public string MaintenanceName { get; set; }

		public string IconPath { get; set; }

        public double Coefficient { get; set; }


        public int BillId { get; set; }
        

        public int MaintenanceTarifId { get; set; }

        public double Tarif { get; set; }

        public DateTime? InvoiceDate { get; set; }
    }
}
