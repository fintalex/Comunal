using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CounterDataDTO
    {
		public int Id { get; set; }
        
        public double Reading { get; set; }
        
        public double? ReadingODN { get; set; }
        
        public DateTime ReadingDate { get; set; }
        
        public bool IsFirst { get; set; }
        

        public int CounterId { get; set; }

        public CounterDTO Counter { get; set; }


        public int CounterTarifId { get; set; }

        //public virtual CounterTarif CounterTarif { get; set; }


        public int BillId { get; set; }

    }
}
