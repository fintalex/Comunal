using Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Domain.Mapping
{
	public class FlatMapping : EntityTypeConfiguration<Flat>
	{
		public FlatMapping()
		{
			this.HasKey(f => f.Id);

			this.Property(f => f.Id)
				.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
				.HasColumnName("Id");

			this.HasMany(f => f.Bills)
				.WithRequired(b => b.Flat)
				.WillCascadeOnDelete(false);

			this.HasMany(f => f.Counters)
				.WithRequired(c => c.Flat)
				.WillCascadeOnDelete(false);

			this.HasMany(f => f.Maintenances)
				.WithRequired(m => m.Flat)
				.WillCascadeOnDelete(false);
		}
	}
}
