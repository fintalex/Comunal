using Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Domain.Mapping
{
    public class MaintenanceDataMapping : EntityTypeConfiguration<MaintenanceData>
    {
        public MaintenanceDataMapping()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");
            
            this.HasRequired(p => p.Bill)
               .WithMany()
               .HasForeignKey(x => x.BillId)
               .WillCascadeOnDelete(false);

            this.HasRequired(p => p.Maintenance)
               .WithMany()
               .HasForeignKey(x => x.MaintenanceId)
               .WillCascadeOnDelete(false);
        }
    }
}
