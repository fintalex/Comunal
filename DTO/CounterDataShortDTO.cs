using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CounterDataShortDTO
    {
		public int Id { get; set; }
        
        public double Reading { get; set; }

        public bool EnableODN { get; set; }

        public double? ReadingODN { get; set; }

        public DateTime? LastReadingDate { get; set; }
        
        public bool IsFirst { get; set; }
        

        public int CounterTarifId { get; set; }

        public int TarifCount { get; set; }

        public double Tarif1 { get; set; }

        public double Limit1 { get; set; }

        public double Tarif2 { get; set; }

        public double Limit2 { get; set; }

        public double Tarif3 { get; set; }

    }
}
