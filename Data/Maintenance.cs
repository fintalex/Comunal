namespace Data
{
	public class Maintenance
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public double Coefficient { get; set; }

		public int SortOrder { get; set; }


		public int FlatId { get; set; }

		public virtual Flat Flat { get; set; }


		public int MaintenanceTypeId { get; set; }

		public virtual MaintenanceType MaintenanceType { get; set; }


		public int? MaintenanceTarifId { get; set; }

		public virtual MaintenanceTarif MaintenanceTarif { get; set; }
	}
}
