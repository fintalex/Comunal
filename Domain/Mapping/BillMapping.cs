using Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Domain.Mapping
{
    public class BillMapping : EntityTypeConfiguration<Bill>
    {
        public BillMapping()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.Property(t => t.Comment).IsRequired().HasMaxLength(255);


            this.HasRequired(p => p.Flat)
               .WithMany()
               .HasForeignKey(x => x.FlatId)
               .WillCascadeOnDelete(true);
        }
    }
}
