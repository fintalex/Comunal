using Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Domain.Mapping
{
	public class CounterMapping : EntityTypeConfiguration<Counter>
	{
        public CounterMapping()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.HasMany<Maintenance>(m => m.Maintenances)
                .WithMany(m => m.Counters)
                .Map(mc =>
                {
                    mc.MapLeftKey("CounterRefId");
                    mc.MapRightKey("MaintenanceRefId");
                    mc.ToTable("MaintenanceDataSource");
                });

        }
    }
}
