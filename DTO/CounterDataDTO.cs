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

        public double StartReading { get; set; }

        public bool EnableODN { get; set; }

        public double? ReadingODN { get; set; }
        
        public int ReadingDateDay { get; set; }

        public int ReadingDateMonth { get; set; }

        public int ReadingDateYear { get; set; }

        public DateTime ReadingDate { get; set; }

        public DateTime? LastReadingDate { get; set; }

        public int? LastCounterDataId { get; set; }

        public CounterDataShortDTO LastCounterDataDTO { get; set; }

        public bool IsFirst { get; set; }
        

        public int CounterId { get; set; }

        public string CounterName { get; set; }

        public string CounterTypeId { get; set; }

        public string IconPath { get; set; }

        //public virtual CounterTarif CounterTarif { get; set; }


        public int BillId { get; set; }
        

        public int CounterTarifId { get; set; }

        public int TarifCount { get; set; }

        public double Tarif1 { get; set; }

        public double Limit1 { get; set; }

        public double Tarif2 { get; set; }

        public double Limit2 { get; set; }

        public double Tarif3 { get; set; }

    }
}
