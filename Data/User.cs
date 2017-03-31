using System.Collections.Generic;

namespace Data
{
	/// <summary>
	/// Пользователь
	/// </summary>
	public class User
	{
		/// <summary>
		/// Id пользователя
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Адрес электронной почты
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// Пароль???
		/// </summary>
		public string Password { get; set; }

		/// <summary>
		/// Имя
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// Фамилия
		/// </summary>
		public string LastName { get; set; }

		#region Navigation properties

		public virtual ICollection<Flat> Flats { get; set; }

		#endregion Navigation properties
	}
}
