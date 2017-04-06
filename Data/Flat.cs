using System.Collections.Generic;

namespace Data
{
	/// <summary>
	/// Квартира
	/// </summary>
	public class Flat
	{
		/// <summary>
		/// Id квартиры
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Название
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Адрес
		/// </summary>
		public string Address { get; set; }

        /// <summary>
        /// Is flat selected
        /// </summary>
        public bool Selected { get; set; }

		#region Navigation properties

		public int? UserId { get; set; }

		public virtual User User { get; set; }


		public virtual ICollection<Bill> Bills { get; set; }

		public virtual ICollection<Counter> Counters { get; set; }

		public virtual ICollection<Maintenance> Maintenances { get; set; }

		#endregion Navigation properties
	}
}
