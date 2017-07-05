using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CounterDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool EnableODN { get; set; }

        public double StartReading { get; set; }

        public int SortOrder { get; set; }

        public int UnitConvertCoefficient { get; set; }


        public int FlatId { get; set; }

        public string FlatName { get; set; }


        public int CounterTypeId { get; set; }

        public string CounterTypeName { get; set; }

        public string IconPath { get; set; }


        public int? CounterTarifId { get; set; }

        public int? TarifCount { get; set; }

        public double? Tarif1 { get; set; }

        public double? Limit1 { get; set; }

        public double? Tarif2 { get; set; }

        public double? Limit2 { get; set; }

        public double? Tarif3 { get; set; }

    }
}
