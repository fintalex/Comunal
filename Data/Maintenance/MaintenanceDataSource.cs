namespace Data
{
	/// <summary>
	/// Источники данных (счетчики) для расчета стоимости услуги
	/// </summary>
	public class MaintenanceDataSource
	{
		public int Id { get; set; }

		#region Navigation properties

		public int CounterId { get; set; }

		public virtual Counter Counter { get; set; }


		public int MaintenanceId { get; set; }

		public virtual Maintenance Maintenance { get; set; }

		#endregion Navigation properties
	}
}
