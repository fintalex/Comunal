namespace Data
{
    public class Counter
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool EnableODN { get; set; }

        public int SortOrder { get; set; }

        public int UnitConvertCoefficient { get; set; }


        public int FlatId { get; set; }

        public virtual Flat Flat { get; set; }


        public int CounterTypeId { get; set; }

        public virtual CounterType CounterType { get; set; }


        public int? CounterTarifId { get; set; }

        public virtual CounterTarif CounterTarif { get; set; }
    }
}
