using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MaintenanceDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int SortOrder { get; set; }

        public double Coefficient { get; set; }


        public int FlatId { get; set; }

        public string FlatName { get; set; }


        public int MaintenanceTypeId { get; set; }

        public string MaintenanceTypeName { get; set; }


        public int? MaintenanceTarifId { get; set; }

        public double Tarif { get; set; }

        public IEnumerable<int> Counters { get; set; }

        public IEnumerable<int> CounterTypes { get; set; }
    }
}
