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

        public int SortOrder { get; set; }

        public int UnitConvertCoefficient { get; set; }


        public int FlatId { get; set; }

        public string FlatName { get; set; }


        public int CounterTypeId { get; set; }

        public string CounterTypeName { get; set; }


        public int? CounterTarifId { get; set; }
    }
}
