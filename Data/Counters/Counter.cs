using System.Collections.Generic;

namespace Data
{
    /// <summary>
    /// Счетчик
    /// </summary>
    public class Counter
    {
        /// <summary>
        /// Id счетчика
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Название
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Учитывать общедомовые нужды (ОДН)
        /// </summary>
        public bool EnableODN { get; set; }

        /// <summary>
		/// First Reading of Counter
		/// </summary>
		public double StartReading { get; set; }

        /// <summary>
        /// Порядок сортировки
        /// </summary>
        public int SortOrder { get; set; } = -1;

        /// <summary>
        /// Коэффициент перевода единиц измерения
        /// </summary>
        public int UnitConvertCoefficient { get; set; }

        #region Navigation properties

        public int FlatId { get; set; }

        public virtual Flat Flat { get; set; }


        public int CounterTypeId { get; set; }

        public virtual CounterType CounterType { get; set; }


        public int? CounterTarifId { get; set; }

        public virtual CounterTarif CounterTarif { get; set; }


        public virtual ICollection<CounterData> CounterDatas { get; set; }

        public virtual ICollection<Maintenance> Maintenances { get; set; }

        #endregion Navigation properties
    }
}
