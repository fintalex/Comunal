using Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Domain.Mapping
{
    public class CounterDataMapping : EntityTypeConfiguration<CounterData>
    {
        public CounterDataMapping()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");
            

            this.HasRequired(p => p.Bill)
               .WithMany()
               .HasForeignKey(x => x.BillId)
               .WillCascadeOnDelete(false);

            this.HasRequired(p => p.Counter)
               .WithMany()
               .HasForeignKey(x => x.CounterId)
               .WillCascadeOnDelete(false);
        }
    }
}
