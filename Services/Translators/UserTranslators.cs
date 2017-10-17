using Data;
using DTO;
using System.Linq;

namespace Services.Translators
{
	public static class UserTranslators
	{
		public static UserDTO ToUserDTO(this User user)
		{
            if (user == null)
            {
                return null;
            }

			var selectedFlat = user.Flats.FirstOrDefault(f => f.Selected);

			return new UserDTO
			{
				Id = user.Id,
				Email = user.Email,
				FirstName = user.FirstName,
				LastName = user.LastName,
				DataRegistration = user.DataRegistration,
				DataLastLogin = user.DataLastLogin,
				Flat = selectedFlat.ToFlatDTO()
			};
		}
	}
}
