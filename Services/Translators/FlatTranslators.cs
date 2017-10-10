using DTO;
using Data;

namespace Services.Translators
{
	public static class FlatTranslators
	{
		public static FlatDTO ToFlatDTO(this Flat flat)
		{
			return new FlatDTO
			{
				Id = flat.Id,
				Name = flat.Name,
				Address = flat.Address,
				Selected = flat.Selected
			};
		}
	}
}
