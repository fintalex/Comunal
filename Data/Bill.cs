using System;
using System.Collections.Generic;

namespace Data
{
	public class Bill
	{
		/// <summary>
		/// Id счета
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Дата
		/// </summary>
		public DateTime InvoiceDate { get; set; }

		/// <summary>
		/// Перерасчет
		/// </summary>
		public double Recalculation { get; set; }

		/// <summary>
		/// Пеня
		/// </summary>
		public double Fine { get; set; }

		/// <summary>
		/// Комментарий
		/// </summary>
		public string Comment { get; set; }

		#region Navigation properties

		public int? FlatId { get; set; }

		public virtual Flat Flat { get; set; }


		public virtual ICollection<CounterData> CounterDatas { get; set; }

		public virtual ICollection<MaintenanceData> MaintenanceDatas { get; set; }

		#endregion Navigation properties
	}
}
