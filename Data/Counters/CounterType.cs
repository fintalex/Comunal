namespace Data
{
	/// <summary>
	/// Тип счетчика
	/// </summary>
	public class CounterType
	{
		/// <summary>
		/// Id типа счетчика
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Название
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Иконка
		/// </summary>
		public string IconPath { get; set; }

		#region Navigation properties

		public int? UnitId { get; set; }

		public virtual Unit Unit { get; set; }

		#endregion Navigation properties
	}
}
