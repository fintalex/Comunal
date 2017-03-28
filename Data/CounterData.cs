using System;

namespace Data
{
    public class CounterData
    {
        public int Id { get; set; }

        public double Data { get; set; }

        public double? DataODN { get; set; }

        public DateTime CreatedDate { get; set; }

        public bool IsFirst { get; set; }


        public int CounterId { get; set; }

        public virtual Counter Counter { get; set; }


        public int CounterTarifId { get; set; }

        public virtual CounterTarif CounterTarif { get; set; }
    }
}
