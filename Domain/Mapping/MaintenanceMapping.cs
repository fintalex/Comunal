using Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Domain.Mapping
{
	public class MaintenanceMapping : EntityTypeConfiguration<Maintenance>
	{
		public MaintenanceMapping()
		{
			this.HasKey(t => t.Id);

			this.Property(t => t.Id)
				.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
				.HasColumnName("Id");
		}
	}
}
