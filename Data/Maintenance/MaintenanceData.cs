namespace Data
{
	/// <summary>
	/// Снимок услуги на момент времени
	/// </summary>
	public class MaintenanceData
	{
		public int Id { get; set; }

		#region Navigation properties

		public int MaintenanceId { get; set; }

		public virtual Maintenance Maintenance { get; set; }


        public int MaintenanceTarifId { get; set; }

        public virtual MaintenanceTarif MaintenanceTarif { get; set; }


        public int? BillId { get; set; }

		public virtual Bill Bill { get; set; }

		#endregion Navigation properties
	}
}
