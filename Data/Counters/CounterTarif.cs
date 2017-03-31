namespace Data
{
	/// <summary>
	/// Тариф счетчика
	/// </summary>
	public class CounterTarif
	{
		/// <summary>
		/// Id тариф
		/// </summary>
		public int Id { get; set; }

		/// <summary>
		/// Количество ступеней разбивки тарифа
		/// </summary>
		public int TarifCount { get; set; }

		public double Tarif1 { get; set; }

		public double Limit1 { get; set; }

		public double Tarif2 { get; set; }

		public double Limit2 { get; set; }

		public double Tarif3 { get; set; }
	}
}
