using System;

namespace Data
{
	/// <summary>
	/// Данные счетчика
	/// </summary>
	public class CounterData
	{
		/// <summary>
		/// Id данных счетчика
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Показания счетчика
		/// </summary>
		public double Reading { get; set; }

        /// <summary>
        /// Общедомовые показания
        /// </summary>
        public double? ReadingODN { get; set; }

		/// <summary>
		/// Дата снятия показаний
		/// </summary>
		public DateTime ReadingDate { get; set; }

        /// <summary>
		/// Дата снятия последних показаний
		/// </summary>
		public DateTime? LastReadingDate { get; set; }

        /// <summary>
		/// Предыдущие Counter Data ID
		/// </summary>
		public int? LastCounterDataId { get; set; }

        /// <summary>
		/// Предыдущие Counter Data
		/// </summary>
		public CounterData LastCounterData { get; set; }

        /// <summary>
        /// Первые показания
        /// </summary>
        public bool IsFirst { get; set; }

		#region Navigation properties

		public int CounterId { get; set; }

		public virtual Counter Counter { get; set; }


        public int CounterTarifId { get; set; }

        public virtual CounterTarif CounterTarif { get; set; }


        public int BillId { get; set; }

		public virtual Bill Bill { get; set; }

		#endregion Navigation properties
	}
}
