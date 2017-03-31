using System.Collections.Generic;

namespace Data
{
	/// <summary>
	/// Услуга
	/// </summary>
	public class Maintenance
	{
		/// <summary>
		/// Id услуги
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Название
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Коэффициент
		/// </summary>
		public double Coefficient { get; set; }

		/// <summary>
		/// Порядок сортировки
		/// </summary>
		public int SortOrder { get; set; }

		#region Navigation properties

		public int FlatId { get; set; }

		public virtual Flat Flat { get; set; }


		public int MaintenanceTypeId { get; set; }

		public virtual MaintenanceType MaintenanceType { get; set; }


		public int? MaintenanceTarifId { get; set; }

		public virtual MaintenanceTarif MaintenanceTarif { get; set; }


		public virtual ICollection<MaintenanceDataSource> MaintenanceDataSources { get; set; }

		#endregion Navigation properties
	}
}
