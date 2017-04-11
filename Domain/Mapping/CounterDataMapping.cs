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
		}
	}
}
